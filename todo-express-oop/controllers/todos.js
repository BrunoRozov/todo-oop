import { Todo } from '../models/todo.js'

class todoController {
    consturctor(){
        //hold todo object in arry
        this.TODOS = [] 
    } 

    createTodo(req, res){
        //get data from POST request
        const task = req.body.task
        const newTodo = new Todo(Math.random().toString(), task)
        this.TODOS.push(newTodo)

        res.json({
            message: 'created new todo object',
            newTask: newTodo
        })
    } 
} 

export const TodoController = new todoController()