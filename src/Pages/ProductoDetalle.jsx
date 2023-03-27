import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import firebase from "../Config/firebase";
import "./ProductoDetalle.css";
import Loading from "../Components/Loading";
import { LoginContext } from "../Context/LoginContext";
import Button from "react-bootstrap/Button";
import { ProductContext } from "../Context/ProductContext";

function ProductoDetalle() {
  const { id } = useParams();
  const [detalles, setDetalles] = useState({});
  const [cargando, setCargando] = useState(true);
  const context = useContext(LoginContext);
  const contextProducto = useContext(ProductContext);

  useEffect(() => {
    const resultado = async () => {
      try {
        const querySnapshot = await firebase
          .firestore()
          .doc(`productos/${id}`)
          .get();
        if (querySnapshot) {
          console.log(querySnapshot);
          setDetalles(querySnapshot.data());
          setCargando(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    resultado();
  }, [id, detalles.imagen, contextProducto]);

  return (
    <Loading loading={cargando}>
      <div id="divDetalle">
        <div id="divTituloDetalle">
          <h1>{detalles.nombre}</h1>
          {context.login && (
            <Button
              as={Link}
              to={`/producto/editar/${id}`}
              variant="outline-info"
              size="lg"
            >
              Modificar producto
            </Button>
          )}
        </div>

        <div id="divImgGrande">
          <img
            id="imgGrande"
            src={detalles.imagen}
            alt={`imagen de ${detalles.nombre}`}
          />
        </div>
        <div id="divInfoCompra">
          <div>
            <p id="pPrecio">$ {detalles.precio}</p>
          </div>
          <div>
            <p>{detalles.descripcion}</p>
          </div>
          {context.login && (
            <Button
              as={Link}
              to={`/producto/comprar/${id}`}
              variant="success"
              size="lg"
            >
              Comprar
            </Button>
          )}
          {!context.login && (
            <Button
              as={Link}
              to={`/login`}
              variant="success"
              size="lg"
              onClick={contextProducto.handleProduct(id)}
            >
              Comprar
            </Button>
          )}
        </div>
      </div>
    </Loading>
  );
}

export default ProductoDetalle;
