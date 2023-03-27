import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlertPersonalizado from "../Components/AlertPersonalizado";
import firebase from "../Config/firebase";
import Loading from "../Components/Loading";
import { Button, Container } from "react-bootstrap";

function CheckOutCompra() {
  const [cargando, setCargando] = useState(true);
  const [detalles, setDetalles] = useState({});
  const [show, setShow] = useState(false);
  const [compra, setCompra] = useState({
    variant: "",
    titulo: "",
    mensaje: "",
    ruta: "",
  });
  const { id } = useParams();

  const onToggle = (value) => {
    setShow(value);
  };

  useEffect(() => {
    const datosProducto = async () => {
      try {
        const documento = await firebase
          .firestore()
          .doc(`productos/${id}`)
          .get();
        if (documento) {
          console.log(documento.data());
          setDetalles(documento.data());
          setCargando(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    datosProducto();
  }, [id]);

  const confirmar = () => {
    setShow(true);
    setCompra({
      variant: "success",
      titulo: "Compra completada",
      mensaje: `Felicitaciones! Has comprado ${detalles.nombre}`,
      ruta: "/",
    });
  };

  return (
    <Loading loading={cargando}>
      <>
        <AlertPersonalizado {...compra} show={show} onToggleView={onToggle} />
        <div
          style={{
            height: "600px",
            backgroundColor: "#777",
            border: "3px solid green",
          }}
        >
          <h3>Estás a un paso de completar tu compra</h3>
          <Container style={{ width: "fit-content", padding: "5vh" }}>
            <img
              src={detalles.imagen}
              alt={`imagen de ${detalles.nombre}`}
              style={{ height: "150px", margin: "0vh 3vh 3vh 3vh" }}
            />
            <div style={{ float: "right" }}>
              <h4>Estás a punto de comprar {detalles.nombre}</h4>
              <h4>Precio final de la compra: $ {detalles.precio}</h4>
              <Button variant="success" onClick={confirmar} size="lg">
                Confirmar compra
              </Button>
            </div>
          </Container>
        </div>
      </>
    </Loading>
  );
}

export default CheckOutCompra;
