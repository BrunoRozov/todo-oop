import { Todo } from '../models/todo.js'

class todoController {
    constructor(){
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

    getTodos(req, res){
        res.json({task: this.TODOS})
    } 

    updateTodo(req, res){
        const todoid = req.params.id
        const updatedTask = req.body.task

        console.log(req.body)
        console.log(req.params)

        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoid)

        if(todoIndex < 0){
            res.json({
                message: 'could not find todo with such index'
            })  
            throw new Error('could not find todo')
        } 

        this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask)
        res.json({
            message: 'todo is updated',
            updatedTask: this.TODOS[todoIndex]
        }) 

    }  
} 

export const TodoController = new todoController()