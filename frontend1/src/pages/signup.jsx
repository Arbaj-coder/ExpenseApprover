import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
import Select from 'react-select'
import countryList from 'react-select-country-list'

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: ''
  })

  const navigate = useNavigate()
  const countries = countryList().getData()

  const handleChange = (e) => {
    const { name, value } = e.target
    setSignupInfo({ ...signupInfo, [name]: value })
  }

  const handleCountryChange = (option) => {
    setSignupInfo({ ...signupInfo, country: option?.label || '' })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    const { name, email, password, confirmPassword, country } = signupInfo

    if (!name || !email || !password || !confirmPassword || !country) {
      return handleError('All fields are required')
    }
    if (password !== confirmPassword) {
      return handleError('Password and Confirm Password do not match')
    }

    try {
      const res = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, country })
      })
      const result = await res.json()
      if (result.success) {
        handleSuccess(result.message)
        setTimeout(() => navigate('/login'), 1000)
      } else {
        handleError(result.message || result.error?.details?.[0]?.message)
      }
    } catch (err) {
      handleError(err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Glass card */}
      <div className="relative backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl max-w-md w-full p-8 space-y-8">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-75 blur-sm"></div>
        <div className="absolute inset-0.5 rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800"></div>
        <div className="relative z-10">
          <div className="text-center mb-6">
            <h1 className="text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-white/70 mt-2">Join us and get started!</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {['name', 'email', 'password', 'confirmPassword'].map((field) => (
              <div key={field} className="group">
                <label
                  htmlFor={field}
                  className="block text-sm font-semibold text-white/90 mb-2 group-focus-within:text-pink-300 transition-colors"
                >
                  {field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <div className="relative">
                  <input
                    id={field}
                    name={field}
                    type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                    placeholder={
                      field === 'name'
                        ? 'Your full name'
                        : field === 'email'
                        ? 'you@example.com'
                        : '••••••••'
                    }
                    value={signupInfo[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-400/50 transition-all duration-300"
                    required
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
              </div>
            ))}

            <div className="group">
              <label className="block text-sm font-semibold text-white/90 mb-2 group-focus-within:text-pink-300 transition-colors">
                Country
              </label>
              <Select
                options={countries}
                value={countries.find((c) => c.label === signupInfo.country)}
                onChange={handleCountryChange}
                isSearchable
                placeholder="Select your country..."
                className="react-select-container"
                classNamePrefix="react-select"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 12,
                  colors: {
                    ...theme.colors,
                    primary25: 'rgba(236, 72, 153, 0.2)',
                    primary: 'rgba(236, 72, 153, 0.6)'
                  }
                })}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Signup</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-full group-hover:-translate-x-1 transition-transform duration-1000"></div>
            </button>
          </form>

          <div className="text-center mt-6 text-white/70 space-y-2">
            <span>
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-pink-300 font-semibold hover:text-pink-200 transition-colors duration-300"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          theme="dark"
          toastClassName="backdrop-blur-lg bg-white/10 border border-white/20"
        />
      </div>
    </div>
  )
}

export default Signup