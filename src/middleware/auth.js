const { send } = require('express/lib/response')
const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
    try {
 const authHeader = req.header('Authorization')
 
 const token = authHeader && authHeader.split('')[1]

 if(!token){
     return res.send({
        message: 'access denied!'
     })
 }

 const SECRET_KEY = 'taskweek2dotcom'

  const verified = jwt.verify(token, SECRET_KEY )   

  req.user = verified

  next()
 } catch (error) {
     return res.send({
         message: 'invalid token'
     })
     
 }
}