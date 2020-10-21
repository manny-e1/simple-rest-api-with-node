const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
	try{
		const token = req.headers.authorization.split(" ")[1]
		console.log(token)
		const decoded = jwt.verify(token,"assakdsadkhd")
		req.userData = decoded
		next()
	}catch(error){
		res.json({
			error:{
				message:error
			}
		})
	}
}