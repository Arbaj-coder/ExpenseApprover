import { Employee } from '../Modals/employee.model';
const jwt = require('jsonwebtoken');
const ensureAuthenticated = (req, res, next) => {
       const auth = req.headers['authorization']; 
    if (!auth) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token is require' });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        const user=Employee.findById(decoded._id);
        req.user = user;
        console.log("Hello" , decoded)
        next();
    } catch (err) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token wrong or expired' });
    }
}

module.exports = ensureAuthenticated;