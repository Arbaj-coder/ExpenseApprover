import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
     country:{
        type: String,
        required: true,
    },
    resetToken: { type: String },           // for forgot password
    resetTokenExpire: { type: Date }        // token expiration
});

export const UserModel = mongoose.model('users', UserSchema);