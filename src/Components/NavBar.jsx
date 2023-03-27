import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useContext } from "react";
import { LoginContext } from "../Context/LoginContext";
import image from "../Resources/SLMusic.png";

const styles = {
  navBar: {
    backgroundColor: "#ea2",
    fontSize: "20px",
    padding: "10px",
    borderRadius: "5px",
    text: "#fff",
  },
  imagenLogo: {
    width: "100px",
    height: "100px",
  },
};

function NavBar() {
  const navigate = useNavigate();
  const context = useContext(LoginContext);
  const desloguear = () => {
    context.handleLogout();
    navigate("/");
  };
  return (
    <Navbar style={styles.navBar} expand="lg">
      {" "}
      <Navbar.Brand as={Link} to="/">
        <img src={image} alt="logo de la página" style={styles.imagenLogo} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Inicio
          </Nav.Link>
          {!context.login && (
            <>
              <Nav.Link as={Link} to="/login">
                Ingresar
              </Nav.Link>
              <Nav.Link as={Link} to="/registro">
                Registrarse
              </Nav.Link>
            </>
          )}
          {context.login && (
            <NavDropdown
              title="Productos"
              id="basic-nav-dropdown"
              style={styles.dropDown}
            >
              <NavDropdown.Item
                as={Link}
                to="/producto/alta"
                style={styles.dropDownItem}
              >
                Subir producto
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
        <Nav>
          {context.login && (
            <NavDropdown
              title={`Has ingresado como ${context.usuario}`}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                onClick={desloguear}
                style={styles.dropDownItem}
              >
                Cerrar Sesión
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
