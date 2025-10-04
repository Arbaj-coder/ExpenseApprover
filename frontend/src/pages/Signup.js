import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import Select from 'react-select';
import countryList from 'react-select-country-list';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: ''
    })

    const navigate = useNavigate();
    const countries = countryList().getData(); // all countries

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
    }

    const handleCountryChange = (selectedOption) => {
        setSignupInfo({ ...signupInfo, country: selectedOption?.label || '' });
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword, country } = signupInfo;

        // Frontend validations
        if (!name || !email || !password || !confirmPassword || !country) {
            return handleError('All fields are required');
        }

        if (password !== confirmPassword) {
            return handleError('Password and Confirm Password do not match');
        }

        try {
            const url = `http://localhost:8080/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, country: country || "Unknown"})
            });
            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => navigate('/login'), 1000);
            } else if (error) {
                const details = error?.details?.[0]?.message;
                handleError(details);
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                    />
                </div>
                <div>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm your password...'
                        value={signupInfo.confirmPassword}
                    />
                </div>
                <div>
                    <label htmlFor='country'>Country</label>
                    <Select
                        options={countries}
                        value={countries.find(c => c.label === signupInfo.country)}
                        onChange={handleCountryChange}
                        isClearable
                        isSearchable
                        placeholder="Select or type your country..."
                    />
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup;
