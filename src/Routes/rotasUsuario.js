const Router = require('express')
const UsuarioController = require('../controllers/UsuarioController')
const { authMiddleware } = require('../middleware/auth-middleware')
const router = Router()

//  ROTAS
router.post('/registrar', UsuarioController.addUsuario)
router.post('/login', UsuarioController.login)

router.get('/saldo', authMiddleware, UsuarioController.getSaldo)

router.get('/', UsuarioController.listAll)
// // router.get('/usuario', (req, res) => {
// //     res.json('teste')
// // })

router.get('/:id', UsuarioController.findId)

router.put('/:id', UsuarioController.update)

router.delete('/:id', UsuarioController.deleta)

module.exports = router
