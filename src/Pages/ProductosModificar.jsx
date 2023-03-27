import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";
import firebase from "../Config/firebase";
import { useEffect } from "react";
import AlertPersonalizado from "../Components/AlertPersonalizado";
import { useState } from "react";

function ProductosModificar() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [modificacion, setModificacion] = useState({
    variant: "",
    titulo: "",
    mensaje: "",
  });
  const [show, setShow] = useState(false);
  const onToggle = (value) => {
    setShow(value);
  };
  useEffect(() => {
    const resultado = async () => {
      try {
        const querySnapshot = await firebase
          .firestore()
          .doc(`productos/${id}`)
          .get();
        if (querySnapshot) {
          console.log(querySnapshot.data());
          setValue("nombre", querySnapshot.data().nombre);
          setValue("precio", querySnapshot.data().precio);
          setValue("descripcion", querySnapshot.data().descripcion);
          setValue("imagen", querySnapshot.data().imagen);
        }
      } catch (e) {
        console.log(e);
      }
    };

    resultado();
  }, [id, setValue]);

  const onSubmit = (data) => {
    console.log(data);
    firebase
      .firestore()
      .doc(`productos/${id}`)
      .set(data)
      .then((res) => {
        console.log(res);
        setModificacion({
          variant: "success",
          titulo: "Genial",
          mensaje: "El producto se ha modificado corectamente",
          ruta: `/producto/${id}`,
        });
        setShow(true);
      })
      .catch((error) => {
        console.log(error);
        setModificacion({
          variant: "danger",
          titulo: "Modificación fallida.",
          mensaje: "Algo salió mal. Intentalo luego nuevamente.",
          ruta: `/producto/editar/${id}`,
        });
        setShow(true);
      });
  };

  const handleDelete = () => {
    firebase
      .firestore()
      .doc(`productos/${id}`)
      .delete()
      .then((res) => {
        console.log(res);
        setModificacion({
          variant: "success",
          titulo: "Producto eliminado",
          mensaje: "El producto se ha eliminado corectamente",
          ruta: `/`,
        });
        setShow(true);
      })
      .catch((error) => {
        console.log(error);
        setModificacion({
          variant: "danger",
          titulo: "Eliminación fallida.",
          mensaje: "Algo salió mal. Intentalo luego nuevamente.",
          ruta: `/producto/editar/${id}`,
        });
        setShow(true);
      });
  };

  return (
    <>
      <AlertPersonalizado
        {...modificacion}
        onToggleView={onToggle}
        show={show}
      />
      <Container style={{ maxWidth: "1000px" }}>
        <Button onClick={handleDelete} variant="danger">
          Eliminar Producto
        </Button>
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
                  Para poder modificar el producto colócale un nombre/título
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
                  Para poder modificar el producto colócale el precio
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
                  Para poder modificar el producto colócale una descripción
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
                  Para poder modificar el producto ingresa la URL de la imagen
                  que deseas mostrar
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

export default ProductosModificar;
