const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require("../models/user")

router.post('/signup',(req,res,next)=>{
	User.find({email:req.body.email})
		.exec()
		.then(result=>{
			if(result.length >=1) {
				console.log("sdjdn")
				res.status(409).json({
					error:{
						message:"email already taken"
					}
				})
			}else{
				bcrypt.hash(req.body.password,10,(err,hash)=>{
					if(err){
						res.json({
							error:err
						})
					}else{
						const user = new User({
							email:req.body.email,
							password:hash
						})
						user.save()
							.then(result=>{
								res.status(201).json({
								message:result
								})
							})
					}
				
			
				})
			}
		
		})
		.catch(err=>{
			res.json({
				err:err
			})
		})
		
	
})

router.post('/signin',(req,res,next)=>{
	User.findOne({email:req.body.email})
		.exec()
		.then(user=>{
			if(user.length < 1) {
				res.status(409).json({
					error:{
						message:"Authentication failed"
					}
				})
			}

			bcrypt.compare(req.body.password,user.password,(err,result)=>{
			console.log("ezi negn")
			if(err){
				return res.json({
					message:"Auth failed"
				})
			}
			if(result){
				const token = jwt.sign({
					email:user.email,
					id:user._id
				},"assakdsadkhd",{	
					expiresIn:"1h"
				})
				return res.status(200)
				.json({message: 'Auth successful',token:token});
			}
			res.status(500).json({
					message:"Auth failed"
				})

			})	
		})
		.catch(err=>{
			res.json({
				error:{
					message:err
				}
			})
		})
})

module.exports = router