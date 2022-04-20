const { User } = require('../../models')

const Joi = require('joi')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')



exports.register = async (req, res) =>{
    
   const data = req.body
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
       

    })
  const {error} = schema.validate(req.body)
    if(error)
        return res.status(400).send({
            error: {
                message:error.details[0].message,
            },
        })
    

        try {

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
    status: "custumer",
});

const payload = {id: User.id}
        const SECRET_KEY = 'taskweek2dotcom'
        
        const token = jwt.sign(payload, SECRET_KEY)


res.status(200).send({
    status: 'succes',
    data:{
        name: newUser.name,
        email: newUser.email,
        token: token,
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
   

    // const data = req.body
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        
        })
      const {error} = schema.validate(req.body)
        if(error){
            return res.status(400).send({
                error: {
                    message:error.details[0].message,
                }
            })
        }
        try {
        const userExist = await User.findOne({
            where:{
                email: req.body.email,
            }
        })
    
        const isValid = await bcrypt.compare(req.body.password, userExist.password)
    
        if (!isValid){
            return res.send({
                error:{
                    message: 'email or password not match',
                }
            })
        }

        const payload = {id: userExist.id}
        const SECRET_KEY = 'taskweek2dotcom'
        
        const token = jwt.sign(payload, SECRET_KEY)
    
    
    res.status(200).send({
        status:'success',
        data:{
            name:userExist.name,
            email:userExist.email,
            status:userExist.status,
            // token,
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

exports.checkAuth = async (req, res) => {
    try {
        const id = req.User.id

        const dataUser = await User.findOne({
            where: {
                id: req.User.id
            },
            attributes: {
                excludes: ['createdAt', 'updatedAt', 'password']
            }
        })

        console.log(dataUser)

        if(!dataUser){
            return res.status(404).send({
                status: 'failed'
            })
        }

        res.send({
            status: 'success...',
            data: {
                user: {
                id: dataUser.id,
                name: dataUser.name,
                email: dataUser.email,
                status: dataUser.status,
            }
            }
        })
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'
        })
    }
}