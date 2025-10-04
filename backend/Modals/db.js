// db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load .env first

const mongo_url = process.env.MONGO_CONN;

if (!mongo_url) {
    console.error("MongoDB connection string is not defined in .env");
    process.exit(1); // stop execution if URI is missing
}

mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected..."))
.catch(err => console.error("MongoDB connection error:", err));
