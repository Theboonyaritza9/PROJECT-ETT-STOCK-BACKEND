const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require("../models/user");

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const { name, email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }

    if(existingUser) {
        const error = new HttpError(
            'User exists already, please login again later',
            422
        );
        return next(error);
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
        const error = new HttpError(
            'Could not hash password, please try again later',
            500
        );
        return next(error);
    }

    const createUser = new User({
        name,
        email,
        image: "image.jpg",
        password: hashedPassword,
        status: "user"
    })

    try {
        await createUser.save();
    } catch(error) {
        const error = new HttpError(
            'Signing up and Save filed, please try again later',
            500
        );
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            { userId: createUser.id, email: createUser.email },
            "Yahari",
            { expiresIn: '1h' }
        );
    } catch (error) {
        const error = new HttpError(
            'JWT Signing was failable, please try again later',
            500
        );
        return next(error);
    }

    res.status(201).json({ userId: createUser.id, email: createUser.email, token: token });
};

exports.signup = signup;
