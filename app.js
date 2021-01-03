const express = require('express');
const mongoose = require('mongoose');
const app = express();

// router
const todolistRouter = require("./routes/todolist-routes");


// default settings
app.use(express.json());


// error
app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unkonwn error occured!' });
})

// Api
app.use('/api/todo', todolistRouter);

// connect mongoDB
mongoose
    .connect(
        'mongodb://localhost:27017/stock-ett',
        { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
    )
    .then(() => app.listen(5000, () => console.log('server starts on port 5000.')))
    .catch(err => console.log(err));

