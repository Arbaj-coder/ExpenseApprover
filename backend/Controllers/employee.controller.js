import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Employee} from "../models/employee.model.js"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { Schema } from "mongoose";


const changeCurrentPassword = asyncHandler(async(req,res)=>{
    const {newPassword} = req.body
    // User should be logged in to change password so use verify JWT middleware to validate logged in user
    const user =await User.findById(req.user?._id);
    if(!user)
    {
        throw new ApiError(401,"Invalid User")
    }
    
    user.password=newPassword
    await user.save({validateBeforeSave:false});

    return res.status(200).json(
        new ApiResponse(200,{},"Password Changed Successfully")
    )
})

const addexpense = asyncHandler(async(req,res)=>{
    const {amount,description,category,date,remarks} = req.body
    // User should be logged in to change password so use verify JWT middleware to validate logged in user
    const user =await Employee.findById(req.user?._id);
    if(!user)
    {
        throw new ApiError(401,"Invalid User")
    }
    const expense = await Expense.create({
        employee: user._id,
        description,
        category,
        date,
        remarks,
        amount,
    })
    user.Expenses.push(expense._id)
    await user.save({validateBeforeSave:false});
})

export {changeCurrentPassword,addexpense}