import express from 'express'
import { getAllTodo,addTodo,deleteTodo,updateTodo } from '../controllers/todoController.js'
import { todoValidator } from '../middleware/todoValidator.js'
import validateRequest from '../middleware/validator.js'
const router = express.Router()

router.route('/').get(getAllTodo).post(todoValidator,validateRequest,addTodo)
router.route('/:id').patch(updateTodo).delete(deleteTodo)

export default router