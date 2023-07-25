const express = require('express')
const database = require('./src/database/db')
// const routes = require('./src/Routes/routes')
const rotasUsuario = require('./src/Routes/rotasUsuario')
const rotasCategoria = require('./src/Routes/rotasCategoria')
const rotasTrans = require('./src/Routes/rotasTrans')
const app = express()

app.use(express.json())
app.use('/usuario', rotasUsuario)
app.use('/categoria', rotasCategoria)
app.use('/trans', rotasTrans)

database
    .sync({ alter: true, logging: false })
    .then((result) => {
        console.log('Banco de dados conectado.')
        app.listen(5000, () => {
            console.log('Servidor rodando na porta 5000.')
        })
    })
    .catch((err) => {
        console.log(err)
    })
