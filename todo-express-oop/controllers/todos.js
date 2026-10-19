import { Todo } from '../models/todo.js'
import { fileManager } from '../utils/files.js'

class todoController {
    constructor(){
        //hold todo object in arry
        this.initTodos()
    } 

    async createTodo(req, res){
        //get data from POST request
        const task = req.body.task
        const newTodo = new Todo(Math.random().toString(), task)
        this.TODOS.push(newTodo)
        await fileManager.writeFile('./data/todos.json', this.TODOS)

        res.json({
            message: 'created new todo object',
            newTask: newTodo
        })
    } 

    async initTodos() {
        const todosData = await fileManager.readFile('./data/todos.json')
        if(todosData !== null) {
            this.TODOS = todosData
        } else {
            this.TODOS = [] // kui ei saa data jäta tühjaks
        } 
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

    deleteTodo(req, res){
        const todoid = req.params.id

        console.log(req.body)
        console.log(req.params)

        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoid)

        if (todoIndex < 0) {
            return res.json({
                message: 'could not find todo with such index'
            })
        }

        const deletedTask = this.TODOS.splice(todoIndex, 1)

        res.json({
            message: 'todo has been deleted',
            deleteTask: deletedTask[0] 
        }) 

    } 
} 

export const TodoController = new todoController()