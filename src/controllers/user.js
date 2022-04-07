const { User } = require ('../../models');

exports.addUsers = async (req, res) => {
    const data = req.body;

    await User.create(data);

    res.send(data);
}