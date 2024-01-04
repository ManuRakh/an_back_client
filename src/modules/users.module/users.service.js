const User = require("../../models/user.model");

const getAllUsers = async () => {
    const foundUsers = await User.findAll({
        where: {
        }
      });
    return foundUsers.map((user) => user.toJSON());
}   

module.exports = {
    getAllUsers,
}