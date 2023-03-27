import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import "./Producto.css";

function Producto({ nombre, precio, descripcion, imagen, id }) {
  return (
    <Col xs={12} se={6} lg={4} xxl={3}>
      <Link to={`/producto/${id}`} style={{ textDecoration: "none" }}>
        <Card id="darkCard" bg="dark" text="white">
          <Card.Img id="cardImg" variant="top" src={imagen} />
          <Card.Body>
            <Card.Title>{nombre}</Card.Title>
            <Card.Text id="cardText">{descripcion}</Card.Text>
            <Card.Text>$ {precio}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

export default Producto;
