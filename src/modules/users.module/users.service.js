const User = require("../../models/user.model");
const { Op } = require("sequelize");

const create = async (params) => {
    const createdUser = await User.create({
        ...params,
    }, {
        returning: true,
    })

    return createdUser;
};

const getAllUsers = async () => {
    const foundUsers = await User.findAll({
        where: {
        }
      });
    return foundUsers.map((user) => user.toJSON());
}   

const update = async (params, id) => {
    const updatedRequest = await User.update({
        ...params,
      }, {
          where :{
            id: {
              [Op.eq]: id
            }
          }
      }, {
        returning: true,
      });
    
      console.log("User updated");
    
      return updatedRequest;
}

const getUser = async (id) => {
    const foundUser = await User.findOne({
        where: {
            id: {
                [Op.eq]: id,
            }
        }
      });
    return foundUser? foundUser.get() : null;

}

module.exports = {
    getAllUsers,
    update,
    getUser,
    create,
}