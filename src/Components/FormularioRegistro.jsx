import { useForm } from "react-hook-form";
import firebase from "../Config/firebase";
import { useState } from "react";
import AlertPersonalizado from "./AlertPersonalizado";
import { registroMessage } from "../Utils/ErrorMessage";
import { Button, Form, Container } from "react-bootstrap";

function FormularioRegistro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [registro, setRegistro] = useState({
    variant: "",
    titulo: "",
    mensaje: "",
    ruta: "",
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
        .createUserWithEmailAndPassword(data.email, data.contrasenia);
      if (responseUser.user.uid) {
        const documento = await firebase
          .firestore()
          .collection("usuarios")
          .add({
            nombre: data.nombre,
            apellido: data.apellido,
            userId: responseUser.user.uid,
          });
        console.log(documento);
        if (documento) {
          setRegistro({
            variant: "success",
            titulo: "Registro exitoso",
            mensaje:
              "Ya puedes acceder a todas las funciones de nuestra página.",
            ruta: "/login",
          });
          setShow(true);
        }
      }
    } catch (error) {
      console.log(error);
      setRegistro({
        variant: "danger",
        titulo: "El registro falló",
        mensaje:
          registroMessage[error.code] ||
          "Comprueba haber colocado tus datos correctamente",
        ruta: "/registro",
      });
      setShow(true);
    }
  };

  return (
    <>
      <AlertPersonalizado {...registro} onToggleView={onToggle} show={show} />

      <div className="divFormRegistro" style={{ color: "white" }}>
        <h3>Registro de Usuario</h3>
      </div>
      <div className="divFormRegistro" style={{ color: "white" }}>
        <span>Completá con tus datos y Registrate</span>
      </div>

      <Container style={{ maxWidth: "500px", height: "100vh" }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="formLabel">Nombre</Form.Label>
            <Form.Control
              type="text"
              {...register("nombre", { required: true })}
              placeholder="Ingresar nombre"
            />
            <Form.Text className="text-muted">
              {errors.nombre?.type === "required" && (
                <span className="spanError">
                  Completa con tu nombre para poder registrarte.
                </span>
              )}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastname">
            <Form.Label className="formLabel">Apellido</Form.Label>
            <Form.Control
              type="text"
              {...register("apellido", { required: true })}
              placeholder="Ingresar apellido"
            />
            <Form.Text className="text-muted">
              {errors.apellido?.type === "required" && (
                <span className="spanError">
                  Completa con tu apellido para poder registrarte.
                </span>
              )}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTel">
            <Form.Label className="formLabel">Teléfono</Form.Label>
            <Form.Control
              type="tel"
              {...register("telefono", { required: true })}
              placeholder="Ingresar telefono (opcional)"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="formLabel">Email</Form.Label>
            <Form.Control
              type="email"
              {...register("email", { required: true })}
              placeholder="Ingresar email"
            />
            <Form.Text className="text-muted">
              {errors.email?.type === "required" && (
                <span className="spanError">
                  Completa con tu email para poder registrarte.
                </span>
              )}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="formLabel">Contraseña</Form.Label>
            <Form.Control
              type="password"
              {...register("contrasenia", { required: true })}
              placeholder="Crear contrasenia"
            />
            <Form.Text className="text-muted">
              {errors.contrasenia?.type === "required" && (
                <span className="spanError">
                  Crea una contraseña para poder registrarte.
                </span>
              )}
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Registrar cuenta
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default FormularioRegistro;
