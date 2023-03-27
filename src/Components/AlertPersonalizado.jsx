import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const styles = {
  divAlert: {
    backgroundColor: "#fff8",
    display: "grid",
    position: "fixed",
    zIndex: 1060,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
};

function AlertPersonalizado({
  variant,
  titulo,
  mensaje,
  ruta,
  show,
  onToggleView,
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${ruta}`);
    onToggleView(false);
  };

  return (
    <Alert show={show} style={styles.divAlert}>
      <Alert key={titulo} show={show} variant={variant}>
        <Alert.Heading>{titulo}</Alert.Heading>
        <p>{mensaje}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={handleClick} variant="outline-success">
            X
          </Button>
        </div>
      </Alert>
    </Alert>
  );
}

export default AlertPersonalizado;
