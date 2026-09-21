import express, { Router } from 'express'
import { TodoController } from '../controllers/todos.js'

const router = Router()

router.post('/nre-todo', (req, res) => TodoController.createTodo(req, res))

export default router