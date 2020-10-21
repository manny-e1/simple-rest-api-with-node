const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = Schema({
	email:{type:String,required:true, 
		unique:true,
		match:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/},
	password:{type:String,required:true}

})

module.exports = mongoose.model('User',userSchema)