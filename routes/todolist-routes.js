const express = require('express');
const todolistController = require('../controllers/todolist-controller');

const router = express.Router();

router.get('/', todolistController.getTodolists);
router.post('/', todolistController.addTodolist);

module.exports = router;

