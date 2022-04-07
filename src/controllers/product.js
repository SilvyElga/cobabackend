const {  product, User, category, categoryProduct } = require ('../../models');

exports.addProduct = async (req, res) => {
    
    try {

    await product.create(req.body);

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






exports.getcategoryProduct = async (req, res) => {
    
    try {

    const data = await product.findAll({
        include: [
            {
            model:User,
            as:'User',
        },
        {
            model:category,
            as:'category',
            through: {
                model: categoryProduct,
                as: 'bridge'
            }
        }
    ] 
  
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