const userModel = require('../models/user.model');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
module.exports.registerUser = async (req, res, next) => {
    const errs = validationResult(req);
    //ths we are using which we will use for showing the error message on frontend
    if (!errs.isEmpty()) {
        return res.status(400).json({ errors: errs.array() });
    }
    // console.log(req.body);
    const { fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createUser({
        firstname: fullName.firstname,
        lastname: fullName.lastname,
        email,
        password: hashedPassword,
    });
    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
}