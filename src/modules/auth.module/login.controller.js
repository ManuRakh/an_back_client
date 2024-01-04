const userModel = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { storeToken, redisDel } = require('../redis.module/redis.service');
const { Op } = require("sequelize");
const hours48 = 48 * 60 * 60;

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ error: 'Login failed' });
        }

        const token = jwt.sign({ id: user.id, role:  user.role}, 'secret', { expiresIn: '48h' });
        await storeToken(token, user.id, hours48);

        res.status(200).send({ user, token });
    } catch (error) {
        res.status(400).send({
            error: error.message,
            data: ""
        });
    }
}

const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secret');

        await redisDel(decoded.id);

        res.status(200).send({ message: 'Successfully logged out' });
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
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secret');

        if (decoded.role !== 'admin') throw new Error("Only admins can register users");

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

        res.status(201).send({ user });
      } catch (error) {
        res.status(400).send({
            error: error.message,
            data: ""
        });
      }
}

module.exports = {
    login,
    logout,
    registerUser,
}