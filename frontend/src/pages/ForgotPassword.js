import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return handleError("Email is required");

        try {
            const response = await fetch("http://localhost:8080/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            const result = await response.json();
            if (result.success) handleSuccess(result.message);
            else handleError(result.message || "Something went wrong");
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className="container">
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your registered email..."
                    />
                </div>
                <button type="submit">Send Reset Link</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default ForgotPassword;
