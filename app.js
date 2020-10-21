const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const productroutes = require('./api/routes/products')
const orderroutes = require('./api/routes/orders')
const userroute = require('./api/routes/users')


mongoose.connect(
	'mongodb+srv://manny:anteneh23@cluster0.pe9vc.mongodb.net/store?retryWrites=true&w=majority',
	{useNewUrlParser: true, useUnifiedTopology: true}
)


app.use(morgan('dev'))
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin",'*')
	res.header(
		"Access-Control-Allow-Header",
		"Origin,X-Requested-With,Content-Type,Accept,Authorization"
		)
	if (req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods',
			'PUT,PATCH,POST,GET,DELETE')
		return res.status(200).json({})
	}
	next()
})


app.use('/products',productroutes)
app.use('/orders',orderroutes)
app.use('/users',userroute)

app.use((req,res,next)=>{
	const error = new Error('not found')
	error.status = 404
	next(error)
})

app.use((error,req,res,next)=>{
	res.status(error.status || 500)
	res.json({
		error:{
			message:error.message
		}
	})
})

app.listen(8080,()=>{
	console.log("listening on port 8080")
})