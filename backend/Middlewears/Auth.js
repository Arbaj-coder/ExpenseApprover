import jwt from 'jsonwebtoken';
import { UserModel } from '../Modals/user.js';

export const ensureAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).json({ message: 'No token provided', success: false });

        const token = authHeader.split(' ')[1]; // Authorization: Bearer <token>
        if (!token) return res.status(401).json({ message: 'No token provided', success: false });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded._id);
        if (!user) return res.status(401).json({ message: 'Invalid token', success: false });

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Unauthorized', success: false });
    }
};
