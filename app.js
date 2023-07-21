const express = require('express')
const database = require('./src/database/db')
const routes = require('./src/Routes/routes')
const app = express()

app.use(express.json())
app.use(routes)

database
    .sync({ alter: true })
    .then((result) => {
        console.log('Banco de dados conectado.')
        app.listen(5000, () => {
            console.log('Servidor rodando.')
        })
    })
    .catch((err) => {
        console.log(err)
    })
