const jwt = require('jsonwebtoken') // npm i jsonwebtoken
require('dotenv').config()

server.use(express.json())

// Uma chave secreta, para criptografia e descriptografia do token,
// normalmente colocamos isso numa variável de ambiente
const SECRET_KEY = process.env.SECRET_KEY

// Exemplo criar usuário
server.post('/user/signup', async (req, res) => {
    const { email } = req.body // Exemplo pegar o email no body
    const id = 151231 // normalmente pegamos o id do usuário criado no banco

    const user = { id, email } // Cria o usuário

    // Gera token
    const token = jwt.sign(
        { id: user.id }, // Passa os dados pessoais não sensível do usuário, normalmente passamos apenas o id
        SECRET_KEY, // passamos a chave para criptografia
        { expiresIn: '30m' } // outras opções do token, nesse caso apenas o tempo de validade 30 minutos, após esse tempo vai ter que logar novamente
    )

    // Retorna agora apenas o token
    return res.json(token)
})

// Middleware para fazer rotas autenticadas
// a cada rota autenticada você tem que chamar essa função
function verifyJWT(req, res, next) {
    try {
        // pega o token de acesso no header da rota
        const accessToken = req.headers.authorization

        if (accessToken) {
            // normalmente recebemos o token assim: "Bearer asajdjaiojtaasd", então pegamos só o token
            const token = accessToken.split(' ')[1]
            // Verifica o token
            jwt.verify(token, SECRET_KEY, (error, user) => {
                // trata erro caso o token seja inválido
                if (error) return res.status(401).json({ error: 'Unauthorized' })
                // seta o user para a requisição
                req.userId = user.id
                // Envia para a próxima rota
                next()
            })
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Error' })
    }
}

// Exemplo rota criptografada
// Só pode acessar se tiver o token certo
// chama a função verify como middleware da rota
server.get('/', verifyJWT, (req, res) => {
    // Conseguimos capturar o id do usuário por causa do verifyJWT
    const { userId } = req
    return res.status(200).json(userId)
})

server.listen(8080, () => {
    console.log('Server started!')
})
