const usersService = require("./users.service");

const getAllUsers = async (req,res) => {
    try {
        const allUsers = await usersService.getAllUsers();
    
        res.jsonp({
          error: "",
          data: { result: allUsers },
        });
      } catch (e) {
        res.status(400).send({ error: e.message, data: {} });
      }
}

module.exports = {
    getAllUsers,
}