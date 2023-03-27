import React from "react";
import { useState } from "react";
export const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [producto, setProducto] = useState(null);

  const handleProduct = (itemId) => {
    setProducto(itemId);
  };
  const handleProductOff = () => {
    setProducto(undefined);
  };

  return (
    <ProductContext.Provider
      value={{ producto, handleProduct, handleProductOff }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
