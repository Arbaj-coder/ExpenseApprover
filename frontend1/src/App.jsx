import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
// import { Toaster } from "react-hot-toast";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import AdminHome from "./pages/AdminHome.jsx";

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
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </>
  );
}

export default App


