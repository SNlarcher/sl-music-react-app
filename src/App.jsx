import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Public from "./Routes/Public";
import NavBar from "./Components/NavBar";
import Container from "react-bootstrap/Container";
import LoginProvider from "./Context/LoginContext";
import ProductProvider from "./Context/ProductContext";

function App() {
  return (
    <div
      className="App"
      style={{ backgroundColor: "#111", height: "fit-content" }}
    >
      <Router basename={process.env.PUBLIC_URL}>
        <LoginProvider>
          <ProductProvider>
            <Container style={{ height: "100vh" }}>
              <NavBar />
              <Public />
            </Container>
          </ProductProvider>
        </LoginProvider>
      </Router>
    </div>
  );
}

export default App;
