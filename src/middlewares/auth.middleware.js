const { verifyToken } = require("../modules/redis.module/redis.service");
const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secret');

        const storedToken = await verifyToken(decoded.id);
        if (token !== storedToken) {
            throw new Error('Not authenticated');
        }

        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authenticated' });
    }
}

module.exports = {
    isAuthenticated,
}