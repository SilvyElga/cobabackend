const {  product, User, category, categoryProduct } = require ('../../models');

exports.addCategory = async (req, res) => {
    
    try {

    await category.create(req.body);

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

exports.getCategories = async (req, res) => {
    
    try {

    const data = await category.findAll();

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

exports.getCategory = async (req, res) => {
    
    try {

        const id = req.params.id

    const data = await category.findOne({
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


exports.updateCategory = async (req, res) => {
    
    try {

        const id = req.params.id

        const newData = req.body

    await category.update(newData, {
        where: {
            id
        },
    });

    res.send({
        status:'succes',
        massage:`update category id: ${id} finished`
    });
        
    } catch (error) {
        console.log(error)
        res.send({
            status:'failed',
            massage:'server error'
        })
    }
    
}

exports.deleteCategory = async (req, res) => {
    
    try {

        const id = req.params.id

    await category.destroy({
        where: {
            id
        },
    });

    res.send({
        status:'succes',
        massaage: `delete category ${id} finished`
    });
        
    } catch (error) {
        console.log(error)
        res.send({
            status:'failed',
            massage:'server error'
        })
    }
    
}