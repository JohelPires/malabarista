const Router = require('express')
const CategoriaController = require('../controllers/CategoriaController')
const { authMiddleware } = require('../middleware/auth-middleware')

const router = Router()

//  ROTAS
router.post('/', authMiddleware, CategoriaController.add)
// router.get('/', (req, res) => {
//     res.json('teste2')
// })

router.get('/', authMiddleware, CategoriaController.listAll)
// router.get('/usuario', (req, res) => {
//     res.json('teste')
// })

router.get('/:id', CategoriaController.findId)

router.put('/:id', CategoriaController.update)

router.delete('/:id', CategoriaController.deleta)

module.exports = router
