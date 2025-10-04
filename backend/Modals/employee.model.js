import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Expense } from "./expense.model.js";
const EmployeeSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    Name:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    Expenses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'expense'
    }],
    role:{
        type:String,
        enum:['Employee','Manager','Finance'],
        default:'Employee'
    },
    Manager:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'employee'
    }],
    password:{
        type:String,
        required:[true, 'Password is required'],
    },
    refreshToken:{
        type:String,
    }
},{
    timestamps:true,
})

EmployeeSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next()
})

EmployeeSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)    
}

EmployeeSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        fullName:this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d'
    }
)
}

EmployeeSchema.methods.generateRefreshToken = function() {
    // example refresh token method
    return jwt.sign(
        { id: this._id, email: this.email },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );
};

export const Employee = mongoose.model("Employee", EmployeeSchema);

