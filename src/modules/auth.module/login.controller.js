const userModel = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ error: 'Login failed' });
        }

        res.status(200).send({ data: { result: user }});
    } catch (error) {
        res.status(400).send({
            error: error.message,
            data: ""
        });
    }
}

const registerUser = async (req, res) => {
    try {
        const { username, password, ...otherFields } = req.body;

        const hashedPassword = await bcrypt.hash(password, 8);
        const existingUser = (await userModel.findOne({
            where: {
                username: {
                    [Op.eq]: username,
                }
            }   
         }))?.get();
        if (existingUser) throw new Error("User with such username already exists");
        
        const user = await userModel.create({ username, password: hashedPassword, ...otherFields }, {
            returning: true
        });

        res.status(201).send({ data: { result: user }});
      } catch (error) {
        res.status(400).send({
            error: error.message,
            data: ""
        });
      }
}

module.exports = {
    login,
    registerUser,
}