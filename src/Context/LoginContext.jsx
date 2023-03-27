import React from "react";
import { useState } from "react";
export const LoginContext = React.createContext();

const LoginProvider = ({ children }) => {
  const [login, setLogin] = useState(sessionStorage.getItem("login") || false);
  const [usuario, setUsuario] = useState({});

  const handleLogin = (datosUsuario) => {
    setLogin(true);
    sessionStorage.setItem("login", true);
    setUsuario(datosUsuario);
  };
  const handleLogout = () => {
    setLogin(false);
    sessionStorage.removeItem("login");
    setUsuario({});
  };

  return (
    <LoginContext.Provider
      value={{ usuario, login, handleLogin, handleLogout }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
