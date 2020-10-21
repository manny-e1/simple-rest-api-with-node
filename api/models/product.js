const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
	name:String,
	price:Number,
	productImage:String
})

module.exports = mongoose.model('Product',productSchema)