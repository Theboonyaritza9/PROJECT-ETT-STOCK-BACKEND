const Todolist = require("../models/todolist");

const HttpError = require('../models/http-error');

const getTodolists = async (req, res, next) => {
    let todolists;
    try {
        todolists = await Todolist.find({});
    } catch (err) {
        const error = new HttpError(
            'Fetching Todolists failed, please try again.',
            500
        );
        return next(error);
    }
    res.json({ todolists: todolists.map(todo => todo.toObject({ getters: true })) });
}


const addTodolist = async (req, res, next) => {
    console.log(req.body);
    const { name, status, description } = req.body;

    const createTodolist = new Todolist({
        name,
        status,
        description
    });

    try {
        await createTodolist.save();
        console.log("save todo success")
    } catch (err) {
        const error = new HttpError(
            'Create todolist failed, please try again.',
            500
        )
        return next(error);
    }

    res.status(201).json({ todolist: createTodolist });
}




exports.getTodolists = getTodolists;
exports.addTodolist = addTodolist;


