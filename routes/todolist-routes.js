const express = require('express');
const todolistController = require('../controllers/todolist-controller');

const router = express.Router();

router.get('/', todolistController.getTodolists);
router.post('/', todolistController.addTodolist);
router.patch('/:tid', todolistController.updateTodolist);
router.delete('/:tid', todolistController.deleteTodolist);


module.exports = router;

