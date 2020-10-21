const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchema = Schema({
	product:{type:Schema.Types.ObjectId, ref:"Product", required:true},
	quanity:{type:Number,default:1}
})

const Order = mongoose.model("Order",orderSchema)

module.exports = Order