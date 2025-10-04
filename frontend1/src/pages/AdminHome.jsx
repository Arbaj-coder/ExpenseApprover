// src/pages/AdminHome.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer.jsx";
import Navbar from "../Components/Navbar.jsx";

function AdminHome() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/employee/all`);
      setEmployees(res.data.employees);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (<>
  <Navbar/>
    <div className="p-8">
      {/* Introduction Section */}
      <div className="mb-8 flex flex-col md:flex-row items-center gap-6">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"
          alt="Admin"
          className="w-48 h-48 rounded shadow"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome Admin!</h1>
          <p className="text-gray-700">
            Manage employees, add new team members, and track their details easily.
          </p>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate("/admin/addEmployee")}
          >
            Add Employee
          </button>
        </div>
      </div>

      {/* Employees Table */}
      <h2 className="text-2xl font-semibold mb-4">All Employees</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Manager</th>
              </tr>
            </thead>
         <tbody>
  {employees.length === 0 ? (
    <tr>
      <td colSpan="4" className="text-center py-4">
        No employees found.
      </td>
    </tr>
  ) : (
    employees.map((emp) => (
      <tr key={emp._id} className="hover:bg-gray-50">
        <td className="border px-4 py-2">{emp.Name}</td>
        <td className="border px-4 py-2">{emp.email}</td>
        <td className="border px-4 py-2">{emp.role}</td>
        <td className="border px-4 py-2">{emp.Manager || "N/A"}</td>
      </tr>
    ))
  )}
</tbody>

          </table>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
    <Footer/>
    </>
  );
}

export default AdminHome;