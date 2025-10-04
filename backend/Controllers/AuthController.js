import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { UserModel } from '../Modals/user.js';

// ---------------- SIGNUP ----------------
export const signup = async (req, res) => {
    try {
        const { name, email, password, country } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) return res.status(409).json({ message: 'User already exists', success: false });

        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPass, country });
        await newUser.save();

        res.status(201).json({ message: 'Signup successful', success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// ---------------- LOGIN ----------------
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(403).json({ message: 'Invalid email or password', success: false });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(403).json({ message: 'Invalid email or password', success: false });

        const token = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ message: 'Login successful', success: true, jwtToken: token, email, name: user.name });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// ---------------- FORGOT PASSWORD ----------------
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found', success: false });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        // Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // Gmail App Password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Link',
            text: `Reset your password using this link: ${process.env.FRONTEND_URL}/reset-password/${token}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Reset link sent to your email', success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// ---------------- RESET PASSWORD ----------------
export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded._id);
        if (!user) return res.status(404).json({ message: 'User not found', success: false });

        const hashedPass = await bcrypt.hash(newPassword, 10);
        user.password = hashedPass;
        await user.save();

        res.status(200).json({ message: 'Password reset successful', success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};
