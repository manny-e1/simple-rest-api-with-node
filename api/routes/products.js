const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const multer = require('multer')
const Product = require('../models/product')
const checkAuth = require('../middleware/check-auth')




const storage = multer.diskStorage({
	destination:(req,file,cb)=>{
		cb(null,"./uploads/")
	},
	filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = (req,file,cb)=>{
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
		cb(null,true)
	}else{
		cb(null,false)
	}
}

const upload = multer({
	storage:storage,
	limits: {
		fileSize:1024*1024*5
	},
	fileFilter:fileFilter

})

 
router.get('/:id',(req,res,next)=>{
	const id = req.params.id
	Product.findById(id)
	.select("_id name price productImage")
	.then(doc=>{
		res.status(201).json({
			data:doc
		})
	})
	.catch(err=>{
		res.status(500).json({
			error:{
				message:err
			}
		})
	})
})

router.get('/',(req,res,next)=>{
	Product.find({})
	.select("_id name price productImage")
	.then(doc=>{
		const response = {
			count:doc.count,
			products:doc.map(doc=>{
				return{
					id:doc._id,
					name:doc.name,
					price:doc.price,
					productImage:doc.productImage,
					request:{
						type:"GET",
						url:'http://localhost:8080/products/'+doc._id
					}}

			})
		}
		res.status(201).json({
			data:response
		})
	})
	.catch(err=>{
		res.status(500).json({
			error:{
				message:err
			}
		})
	})
})

router.delete('/:id',(req,res,next)=>{
	const id = req.params.id
	Product.remove({_id:id})
	.then(doc=>{
		res.status(200).json({
			data:doc
		})
	})
	.catch(err=>{
		res.status(500).json({
			error:{
				message:err
			}
		})
	})
})

router.patch('/:id',(req,res,next)=>{
	const id = req.params.id
	const updateprops = {}
	Object.assign(updateprops,req.body)
	Product.update({_id:id},{$set:updateprops})
	.then(doc=>{
		res.status(200).json({
			data:docx	
		})
	})
	.catch(err=>{
		res.status(500).json({
			error:{
				message:err
			}
		})
	})
})


router.post('/', checkAuth, upload.single("productImage"), (req,res,next)=>{
	console.log(checkAuth)
	const product = new Product({
		name:req.body.name,
		price:req.body.price,
		productImage:req.file.path
	})
	product.save()
	.then(result=>{
		res.status(200).json({
			createdProducts:product
		})
	})
	.catch(err=>{
		res.status(500).json({
			error:{
				message:err
			}
		})
	})
	
})

module.exports = router