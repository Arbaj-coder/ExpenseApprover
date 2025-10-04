import express from 'express';
import { ensureAuthenticated } from '../Middlewears/Auth.js';
const router = express.Router();

// Example route
router.get('/all', ensureAuthenticated, async (req, res) => {
    res.json({ message: 'Products route works' });
});

export default router;  // ✅ default export
