const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Product = require('../models/product')
const Order = require('../models/order')





router.post("/",async (req,res,next)=>{
	
	const order = new Order({
		product:req.body.productId,
		quantity:req.body.quantity
	})
	try{
		const val = await order.save()
		
		res.status(201).json({
			message:val
		})
	}catch(err){
		res.json({
			error:err.message
		})
	}
})

router.get("/", async (req,res,next)=>{
	try{
		await Order.find() 
		.select('_id product quanity ')
		.populate('product','name price _id')
		.exec(function (err, result) {
		    if (err) return handleError(err);
		    res.status(200).json({
			data:result
		})
		  })
		
	}catch(err){
		res.json({
			error:err.message
		})
	}
})

router.get("/:id", async (req,res,next)=>{
	
	try{
		const val = await Order.find({_id:req.params.id})
		.select('_id product quanity ')
		.populate('product','name price _id')
		.exec(function (err, result) {
		    if (err) return handleError(err);
		    res.status(200).json({
			data:result
		})
		  })
	}catch(err){
		res.json({
			error:err.message
		})
	}
})

router.patch("/:id", async (req,res,next)=>{
	
	try{
		const val = await Order.update({_id:req.params.id},{$set:req.body})
		
		res.status(200).json({
			message:val
		})
	}catch(err){
		res.json({
			error:err.message
		})
	}
})

router.delete("/:id", async (req,res,next)=>{
	
	try{
		const val = await Order.remove({_id:req.params.id})
		
		res.status(200).json({
			message:val
		})
	}catch(err){
		res.json({
			error:err.message
		})
	}

})
module.exports = router


