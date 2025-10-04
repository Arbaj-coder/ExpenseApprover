// src/RefreshHandler.jsx
import { useEffect } from "react";

const RefreshHandler = ({ setIsAuthenticated }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, [setIsAuthenticated]);

  return null;
};

export default RefreshHandler;
