import "../Styles/StyleGlobal.css";
import Productos from "../Components/Productos";
import Container from "react-bootstrap/Container";

function Home() {
  return (
    <Container style={{ backgroundColor: "#000" }}>
      <Productos />
    </Container>
  );
}

export default Home;
