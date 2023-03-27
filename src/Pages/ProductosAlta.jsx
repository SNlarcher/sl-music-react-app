import { useForm } from "react-hook-form";
import firebase from "../Config/firebase";
import { useState } from "react";
import AlertPersonalizado from "../Components/AlertPersonalizado";
import { Button, Form, Container } from "react-bootstrap";

function ProductosAlta() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [altaExitosa, setAltaExitosa] = useState({
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
      const documento = await firebase
        .firestore()
        .collection("productos")
        .add(data);
      console.log(documento);
      console.log(documento.id);
      if (documento) {
        setAltaExitosa({
          variant: "success",
          titulo: "El producto se ha agregado correctamente",
          mensaje: "El producto ya se encuentra registrado en nuestra página",
          ruta: `/producto/${documento.id}`,
        });
        setShow(true);
      }
    } catch (error) {
      console.log(error);
      setAltaExitosa({
        variant: "danger",
        titulo: "No se ha podido agregar el producto",
        mensaje: "Ha ocurrido un error :(. Intentalo luego nuevamente",
        ruta: `/producto/alta`,
      });
      setShow(true);
    }
  };
  return (
    <>
      <AlertPersonalizado
        {...altaExitosa}
        onToggleView={onToggle}
        show={show}
      />
      <Container style={{ maxWidth: "1000px" }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="formLabel">Nombre</Form.Label>
            <Form.Control
              type="test"
              placeholder="Ingresar nombre de producto"
              {...register("nombre", { required: true })}
            />
            <Form.Text className="text-muted">
              {errors.nombre?.type === "required" && (
                <span className="spanError">
                  Para poder subir el producto colócale un nombre/título
                </span>
              )}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="formLabel">Precio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar precio"
              {...register("precio", { required: true })}
            />
            <Form.Text className="text-muted">
              {errors.precio?.type === "required" && (
                <span className="spanError">
                  Para poder subir el producto colócale el precio
                </span>
              )}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="formLabel">Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar Descripción"
              {...register("descripcion", { required: true })}
            />
            <Form.Text className="text-muted">
              {errors.descripcion?.type === "required" && (
                <span className="spanError">
                  Para poder subir el producto colócale una descripción
                </span>
              )}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="formLabel">Imagen</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar URL de imagen"
              {...register("imagen", { required: true })}
            />
            <Form.Text className="text-muted">
              {errors.imagen?.type === "required" && (
                <span className="spanError">
                  Para poder subir el producto ingresa la URL de la imagen que
                  deseas mostrar
                </span>
              )}
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default ProductosAlta;
