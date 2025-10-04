import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home"
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

   const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={<PrivateRoute element={<Home />} isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </>
  );
}

export default App;