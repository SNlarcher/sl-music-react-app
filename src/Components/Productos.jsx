import { useEffect, useState } from "react";
import Producto from "./Producto";
import firebase from "../Config/firebase";
import Loading from "./Loading";
import Row from "react-bootstrap/Row";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = () => {
      firebase
        .firestore()
        .collection("productos")
        .get()
        .then((querySnapshot) => {
          setProductos(querySnapshot.docs);
          setCargando(false);
        });
    };
    obtenerProductos();
  }, []);

  return (
    <Loading loading={cargando}>
      <Row>
        {productos?.map((producto) => (
          <Producto key={producto.id} {...producto.data()} id={producto.id} />
        ))}
      </Row>
    </Loading>
  );
}

export default Productos;
