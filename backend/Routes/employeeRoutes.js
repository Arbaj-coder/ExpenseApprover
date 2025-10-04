import express from "express";
import bcrypt from "bcryptjs";
import Employee from "../models/Employee.js";
import { generatePassword } from "../utils/generatePassword.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

// Admin adds employee
router.post("/add", async (req, res) => {
    try {
        const { Name, email, role, Manager } = req.body;

        // generate random password
        const rawPassword = generatePassword(10);
        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        // create employee
        const newEmployee = new Employee({
            Name,
            email,
            role,
            Manager,
            password: hashedPassword
        });

        await newEmployee.save();

        // send email
        const message = `
        Hello ${Name},

        Welcome to the Expense Management System.
        Your account has been created with the following details:

        Role: ${role}
        Manager: ${Manager || "N/A"}
        Temporary Password: ${rawPassword}

        Please login and change your password.
        `;

        await sendEmail(email, "Welcome to Expense Management System", message);

        res.status(201).json({ message: "Employee added & email sent!", employee: newEmployee });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

export default router;
