import express from 'express'
import bodyParser from 'body-parser'

import todoRoutes from './routes/todos.js'

const app = express()
app.use(bodyParser.json())

app.use('/todos', todoRoutes)

app.listen(6000, () => {
    console.log('server is connected at port 6000')
})