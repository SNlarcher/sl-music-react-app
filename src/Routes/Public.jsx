import { Routes, Route } from "react-router-dom";
import CheckOutCompra from "../Pages/CheckOutCompra";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import ProductoDetalle from "../Pages/ProductoDetalle";
import ProductosAlta from "../Pages/ProductosAlta";
import ProductosModificar from "../Pages/ProductosModificar";
import Registro from "../Pages/Registro";

function Public() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/producto/comprar/:id" element={<CheckOutCompra />} />
        <Route path="/producto/alta" element={<ProductosAlta />} />
        <Route path="/producto/editar/:id" element={<ProductosModificar />} />
      </Routes>
    </div>
  );
}

export default Public;
