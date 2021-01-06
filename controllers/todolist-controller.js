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


const updateTodolist = async (req, res, next) => {
    console.log(req.body);
    const { name, status, description } = req.body;
    const todoId = req.params.tid;
    let todo;

    try{
        todo = await Todolist.findById(todoId);
    } catch(err) {
        const error = new HttpError(
            'Cant access to database, please try again.',
            500
        )
        return next(error);
    }

    todo.name = name;
    todo.status = status;
    todo.description = description;

    try {
        await todo.save();
        console.log('Updated TodoLists successfully');
    } catch (err) {
        const error = new HttpError(
            'updated todolist failed, please try again.',
            500
        )
        return next(error);
    }

    

    res.status(201).json({ todo: todo.toObject({ getters: true }) });
};

const deleteTodolist = async (req, res, next) => {
    const todoId = req.params.tid;
    let todo;

    try{
        todo = await Todolist.findById(todoId);
    } catch(err) {
        const error = new HttpError(
            'Cant access to database, please try again.',
            500
        )
        return next(error);
    }

    try {
        await todo.remove();
        console.log('Removed TodoLists successfully');
    } catch (err) {
        const error = new HttpError(
            'removed todolist failed, please try again.',
            500
        )
        return next(error);
    }

    res.status(201).json({ message: "Delete successfully" });
};


exports.getTodolists = getTodolists;
exports.addTodolist = addTodolist;
exports.updateTodolist = updateTodolist;
exports.deleteTodolist = deleteTodolist;




