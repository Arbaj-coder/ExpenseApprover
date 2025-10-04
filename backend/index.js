import dotenv from 'dotenv';
import employeeRoutes from './Routes/employeeRoutes.js';
dotenv.config(); // <-- load .env first

import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import AuthRouter from './Routes/AuthRouter.js';
import ProductRouter from './Routes/ProductRouter.js';
import './Modals/db.js';  // now process.env.MONGO_CONN will be defined

const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use("/api/employees", employeeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});
