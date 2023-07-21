const Router = require('express')
// const UsuarioController = require('./src/controllers/UsuarioController')
// const TarefaController = require('./src/controllers/TarefaController')
const router = Router()

//  ROTAS
// router.post('/usuario', UsuarioController.addUsuario)
router.get('/usuario', (req, res) => {
    res.json('teste')
})

// router.get('/usuario', UsuarioController.listAll)
// router.get('/usuario', (req, res) => {
//     res.json('teste')
// })

// router.get('/usuario/:id', UsuarioController.findId)

// router.put('/usuario/:id', UsuarioController.update)

// router.delete('/usuario/:id', UsuarioController.deleta)

// router.post('/tarefa', TarefaController.addTarefa)

// router.get('/tarefa', TarefaController.listAll)

// router.get('/tarefa/:id', TarefaController.findId)

// router.put('/tarefa/:id', TarefaController.update)

// router.delete('/tarefa/:id', TarefaController.deleta)

module.exports = router
