const jwt = require("jsonwebtoken");
const User = require("../models/user");
require('dotenv').config();




exports.isAuth = async (req, res, next) => {
    const authorizationToken = req.headers.authorization;
    const token = authorizationToken?.split("Bearer ")[1];
    const data = jwt.verify(token, process.env.JWT_KEY);
    try {
        const user = await User.findById(data.user._id)
        if (!user) {
            return res.status(400).json({ error: "some error!" });
        }
        req.user = user;
        return next();
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role === "admin") next();
    else res.status(400).json({ error: "Protected only for admin!" });
};
