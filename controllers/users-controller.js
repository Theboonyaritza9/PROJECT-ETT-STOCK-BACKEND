const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require("../models/user");

const getUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find({}, '-password');
    } catch (err) {
        const error = new HttpError(
            'Fetching users failed, please try again later',
            500
        );
        return next(error);
    }

    res.json({ users: users.map( user => user.toObject({ getters: true }) )});
}

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
    } catch (err) {
        const error = new HttpError(
            'Could not hash password, please try again later',
            500
        );
        return next(error);
    }

    const createUser = new User({
        name: name,
        email: email,
        image: "image.jpg",
        password: hashedPassword,
        status: "user"
    })

    console.log(createUser)

    try {
        await createUser.save();
    } catch(err) {
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
            "ETT-STOCK",
            { expiresIn: '1h' }
        );
    } catch (err) {
        const error = new HttpError(
            'JWT Signing was failable, please try again later',
            500
        );
        return next(error);
    }

    res.status(201).json({ userId: createUser.id, email: createUser.email, token: token });
};

const login =  async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        );
        return next(error);
    }


    if(!existingUser) {
        const error = new HttpError(
            'Invalid credentials, please login again.',
            403
        );
        return next(error);
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError(
            'Hashed password failed.',
            500
        );
        return next(error);
    }

    if(!isValidPassword) {
        const error = new HttpError(
            'Invalid credentials, please login again.',
            403
        );
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            "ETT-STOCK",
            { expiresIn: "1h" }
        );
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        );
        return next(error);
    }

    res.json({
        userId: existingUser.id,
        email: existingUser.email,
        token: token
    });

    console.log(existingUser)
};

exports.getUsers =getUsers;
exports.signup = signup;
exports.login = login;

