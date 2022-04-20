const {  product, User, category, categoryProduct } = require ('../../models');

exports.addProduct = async (req, res) => {
    
    try {
        let categoryId = req.body
    console.log(data)

    if(categoryId){
        categoryId= categoryId.split(',')
    } 

    const data = {
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        image: req.file.filename,
        qyt: req.body.qyt,
        idUser:req.User.id,
    }

    let newProduct = await product.create(data);

    if (categoryId){
        const productCategoryData = categoryId.map((item) => {
            return {idProduct: newProduct.id, idCategory:parseInt(item)}
        })
        await categoryProduct.bulkCreate(productCategoryData)
    }

    let productData = await productData. findOne({
        where: {
            id: newProduct.id,
        },
        include: [
            {
                model: User,
                as: 'user',
                attributes: {
                    exclude:['createdAt', 'updateAt', 'password'],
                }
            },
            {
                model: category,
                as:'categories',
                throught: {
                    model: productCategory,
                    as: 'bridge',
                    attributes: [], 
                },

            }
        ]


    })

    productData = JSON.parse(JSON.stringify(productData))
    res.send({
        status:'succes',
        data: {
            ...productData,
            image: process.env.PATH_FILE + productData.image,
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

exports.getProduct = async (req, res) => {
    
    try {
        const {id} = req.params
    const data = await product.findOne({
        where: {
            id,
        },
        include:[
        {
            as:'User',
            model: User
        },
        {
            module: category,
            as: 'categories',
            through: {
                model: productCategory,
                as:'bridge',
                attributes: [],
            }
        }
        ]
    });

    data = JSON.parse(JSON.stringify(data))

    data = {
        ...data,
        image: process.env.PATH_FILE + data.image,

    }

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

exports.getProducts = async (req, res) => {
    
    try {

    const data = await product.findAll({
        include: [
            {
                model: User,
                as: 'user',
            }
        ]
    });
    data = JSON.parse(JSON.stringify(data))

    data = data.map((item)=>{
        return {
            ...item, image: process.env.PATH_FILE + item.image
        }
    })
    
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

exports.getDetail = async (req, res) => {
    
    try {

        const id = req.params.id

    const data = await product.findOne({
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

exports.updateProduct = async (req, res) => {
    
    try {

        const id = req.params.id

        const newData = req.body

    await product.update(newData, {
        where: {
            id
        },
    });

    res.send({
        status:'succes',
        massage:`update product id: ${id} finished`
    });
        
    } catch (error) {
        console.log(error)
        res.send({
            status:'failed',
            massage:'server error'
        })
    }
    
}

exports.deleteProduct = async (req, res) => {
    
    try {

        const id = req.params.id

    await product.destroy({
        where: {
            id
        },
    });

    res.send({
        status:'succes',
        massaage: `delete product id ${id} finished`
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