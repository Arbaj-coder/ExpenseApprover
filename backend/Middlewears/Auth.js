import jwt from 'jsonwebtoken';

export const ensureAuthenticated = (req, res, next) => {
   const auth = req.headers['authorization']; 
   if (!auth) {
       return res.status(403)
           .json({ message: 'Unauthorized, JWT token is require' });
   }
   try {
       const decoded = jwt.verify(auth, process.env.JWT_SECRET);
       req.user = decoded;
       console.log("hello req.user" , decoded)
       next();
   } catch (err) {
       console.error(err);
       res.status(401).json({ message: 'Unauthorized', success: false });
   }
};
