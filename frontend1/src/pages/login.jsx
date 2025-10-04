import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();

      if (result.success) {
        handleSuccess(result.message);
        localStorage.setItem("token", result.jwtToken);
        localStorage.setItem("loggedInUser", result.name);
        setTimeout(() => navigate('/home'), 1000);
      } else {
        handleError(result.message || "Login failed");
      }
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl max-w-md w-full p-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">Welcome Back</h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={loginInfo.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={loginInfo.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4 space-y-2 text-gray-600 text-sm">
          <Link to="/forgot-password" className="block text-purple-700 hover:underline">Forgot Password?</Link>
          <span>
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-purple-700 font-semibold hover:underline">
              Signup
            </Link>
          </span>
        </div>
      <ToastContainer />
      </div>
    </div>
  );
}

export default Login;