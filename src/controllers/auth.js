const { User } = require('../../models')

const Joi = require('joi')

const bcrypt = require('bcrypt')

exports.register = async (req, res) =>{
    
    
    
    
    
    
    try {

   

    const data = req.body
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        status: Joi.string().required()

    })
  const {error} = schema.validate(data)
    if(error){
        return res.status(400).send({
            error: {
                message:error.details[0].message,
            }
        })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    
    const isAlready = await User.findOne({
        where:{
            email: data.email,
        }
    })


    if (isAlready){
        return res.send({
            error:{
                message: `account ${data.email} is Already`,
            }
        })
    }

const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    status: req.body.status,
});


res.status(200).send({
    status: 'succes',
    data:{
        name: newUser.name,
        email: newUser.email,
    }
})
    
    
} catch (error) {
    console.log(error)
    res.send({
        status: 'failed',
        message: 'server error'
    })
}
}



exports.login = async (req, res) =>{
    try {

        const data = req.body
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        
        })
      const {error} = schema.validate(data)
        if(error){
            return res.status(400).send({
                error: {
                    message:error.details[0].message,
                }
            })
        }
        const userExist = await User.findOne({
            where:{
                email: data.email,
            }
        })
    
        const isValid = await bcrypt.compare(data.password, userExist.password)
    
        if (!isValid){
            return res.send({
                error:{
                    message: 'email or password not match',
                }
            })
        }
    
    
    res.status(200).send({
        status:'success',
        data:{
            name:userExist.name,
            email:userExist.email,
        }
    })
        
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'server error'
        })
    } 
}