const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId : {type:mongoose.Schema.Types.ObjectId , ref:'user' , required:true} ,
    items : [{
        productID:{type:mongoose.Schema.Types.ObjectId , required : true , ref:"product"},
        quantity :{type:Number,required:true }
    }],
    totalAmount:{type:Number, required:true},
    status:{type:String,enum:["pending","complete","canceled"],default:"pending"}
})
const order = mongoose.model("order",orderSchema);
module.exports = {order};