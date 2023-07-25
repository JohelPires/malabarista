const Router = require('express')
const TransController = require('../controllers/TransController')
const { authMiddleware } = require('../middleware/auth-middleware')

const router = Router()

//  ROTAS
router.post('/', authMiddleware, TransController.add)
// router.get('/', (req, res) => {
//     res.json('teste2')
// })

router.get('/', authMiddleware, TransController.listAll)
// router.get('/usuario', (req, res) => {
//     res.json('teste')
// })

router.get('/:id', TransController.findId)

router.put('/:id', TransController.update)

router.delete('/:id', TransController.deleta)

module.exports = router
