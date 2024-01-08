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

const update = async (req, res) => {
  const { params, body} = req;
  const { id } = params;

  try {
    const updatedUser = await usersService.update(body, id);

    res.jsonp({
      error: "",
      data: { result: updatedUser },
    });
  } catch (e) {
    res.status(400).send({ error: e.message, data: {} });
  }
}

const getUser = async (req, res) => {
  const { params } = req;
  const { id } = params;

  try {
    const foundUser = await usersService.getUser(id);

    res.jsonp({
      error: "",
      data: { result: foundUser },
    });
  } catch (e) {
    res.status(400).send({ error: e.message, data: {} });
  }
}

const create = async (req, res) => {
  const { body } = req;

  try {
    const foundUser = await usersService.create(body);

    res.jsonp({
      error: "",
      data: { result: foundUser },
    });
  } catch (e) {
    console.log(e.errors[0].message)
    res.status(400).send({ error: e?.errors[0]?.message || e.message, data: {} });
  }
}

module.exports = {
    getAllUsers,
    update,
    getUser,
    create,
}