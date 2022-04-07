const { user } = require ('../../models');

exports.addUsers = async (req, res) => {

    try {
        const data = req.body;

        const userData = await user.create({data});
    
        res.send(userData);
        
    } catch (error) {
        console.log('error')
        
    }
    
}