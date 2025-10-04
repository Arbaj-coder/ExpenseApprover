import mongoose,{Schema} from "mongoose";
import { Employee } from "./employee.model.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const expenseSchema = new Schema({
    employee:{
        type  : Schema.Types.ObjectId,
        ref:"Employee"
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true   
    },
    paidby:{
        type:Schema.Types.ObjectId,
        ref:"Employee",
        default:null
    },
    remarks:{
        type:String,
        default:"None"
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['Pending','Approved','Rejected'],
    },
    receipt:{
        type: String,
        default:null
    },
},{
    timestamps:true
})

expenseSchema.plugin(mongooseAggregatePaginate);  
export const Expense= mongoose.model("Expense", expenseSchema);