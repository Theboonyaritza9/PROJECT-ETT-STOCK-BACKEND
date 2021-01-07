const express = require('express');
const mongoose = require('mongoose');
const app = express();

// router
const todolistRouter = require("./routes/todolist-routes");
const userRouter = require("./routes/users-routes");


// default settings
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

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
app.use('/api/user', userRouter);

// connect mongoDB
mongoose
    .connect(
        'mongodb://localhost:27017/stock-ett',
        { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
    )
    .then(() => app.listen(5000, () => console.log('server starts on port 5000.')))
    .catch(err => console.log(err));

