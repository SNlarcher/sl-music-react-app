import { useForm } from "react-hook-form";
import firebase from "../Config/firebase";
import AlertPersonalizado from "./AlertPersonalizado";
import { logueoMessage } from "../Utils/ErrorMessage";
import { useState, useContext } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { LoginContext } from "../Context/LoginContext";
import { ProductContext } from "../Context/ProductContext";

function FormularioLogueo() {
  const context = useContext(LoginContext);
  const contextProducto = useContext(ProductContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [logueo, setLogueo] = useState({
    variant: "",
    titulo: "",
    mensaje: "",
  });
  const [show, setShow] = useState(false);
  const onToggle = (value) => {
    setShow(value);
  };
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const responseUser = await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.contrasenia);
      console.log(responseUser);
      if (responseUser) {
        const datosUsuario = await firebase
          .firestore()
          .collection("usuarios")
          .where("userId", "==", responseUser.user.uid)
          .get();
        const usuario = datosUsuario.docs[0].data();
        setLogueo({
          variant: "success",
          titulo: "Te has logueado exitosamente",
          mensaje: `Bienvenido nuevamente ${usuario.nombre}`,
          ruta: contextProducto.producto
            ? `/producto/${contextProducto.producto}`
            : "/",
        });
        setShow(true);
        context.handleLogin(usuario.nombre);
        contextProducto.handleProductOff();
      }
    } catch (error) {
      console.log(error);
      setLogueo({
        variant: "danger",
        titulo: "No has podido loguearte",
        mensaje: logueoMessage[error.code] || "Algo ha fallado",
        ruta: "/login",
      });
      setShow(true);
    }
  };
  return (
    <>
      <AlertPersonalizado {...logueo} onToggleView={onToggle} show={show} />

      <div className="divFormRegistro" style={{ color: "white" }}>
        <h3>Ingresar con tu cuenta</h3>
      </div>
      <div className="divFormRegistro" style={{ color: "white" }}>
        <span>Completá con tus datos y logueate</span>
      </div>

      <Container style={{ maxWidth: "500px", height: "100vh" }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="formLabel">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresar email"
              {...register("email", { required: true })}
            />
            <Form.Text className="text-muted">
              {errors.email?.type === "required" && (
                <span className="spanError">
                  Completa con tu dirección de email para poder ingresar
                </span>
              )}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="formLabel">Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresar Contraseña"
              {...register("contrasenia", { required: true })}
            />
            <Form.Text className="text-muted">
              {errors.contrasenia?.type === "required" && (
                <span className="spanError">
                  Escribe tu contraseña para poder ingresar
                </span>
              )}
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Ingresar
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default FormularioLogueo;
