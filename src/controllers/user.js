const { User, profile, product } = require ('../../models');

exports.addUsers = async (req, res) => {
    
    try {

    await User.create(req.body);

    res.send({
        status:'succes',
        massaage: 'add user finished'
    });
        
    } catch (error) {
        console.log(error)
        res.send({
            status:'failed',
            massage:'server error'
        })
    }
    
}

exports.getUsers = async (req, res) => {
    
    try {

    const data = await User.findAll();

    res.send({
        status:'succes',
        succes: {
            data
        }
    });
        
    } catch (error) {
        console.log(error)
        res.send({
            status:'failed',
            massage:'server error'
        })
    }
    
}


exports.getUser = async (req, res) => {
    
    try {

        const id = req.params.id

    const data = await User.findOne({
        where: {
            id
        },
    });

    res.send({
        status:'succes',
        succes: {
            data
        }
    });
        
    } catch (error) {
        console.log(error)
        res.send({
            status:'failed',
            massage:'server error'
        })
    }
    
}

exports.updateUser = async (req, res) => {
    
    try {

        const id = req.params.id

        const newData = req.body

    await User.update(newData, {
        where: {
            id
        },
    });

    res.send({
        status:'succes',
        massage:`update user data id: ${id} finished`
    });
        
    } catch (error) {
        console.log(error)
        res.send({
            status:'failed',
            massage:'server error'
        })
    }
    
}


exports.deleteUser = async (req, res) => {
    
    try {

        const id = req.params.id

    await User.destroy({
        where: {
            id
        },
    });

    res.send({
        status:'succes',
        massaage: `delete user id ${id} finished`
    });
        
    } catch (error) {
        console.log(error)
        res.send({
            status:'failed',
            massage:'server error'
        })
    }
    
}

exports.getProfile = async (req, res) => {
    
    try {

    const data = await profile.findAll({
        include:{
            as:'User',
            model: User
        }
    });

    res.send({
        status:'succes',
        data: {
            data,
        }
    });
        
    } catch (error) {
        console.log(error)
        res.send({
            status:'failed',
            massage:'server error'
        })
    }
    
}


exports.getUserProducts = async (req, res) => {
    
    try {

    const data = await User.findAll({
        include: {
            model: product,
            as:'products',
        }
    });

    res.send({
        status:'succes',
        succes: {
            data
        }
    });
        
    } catch (error) {
        console.log(error)
        res.send({
            status:'failed',
            massage:'server error'
        })
    }
    
}
