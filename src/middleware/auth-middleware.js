const jwt = require('jsonwebtoken')
require('dotenv').config()
const { SECRET_KEY } = require('../secret')

async function authMiddleware(request, response, next) {
    try {
        const accessToken = request.headers.authorization

        if (accessToken) {
            const token = accessToken.split(' ')[1]
            jwt.verify(token, SECRET_KEY, (error, user) => {
                if (error) {
                    return response.status(401).json({
                        error: 'Não autorizado!',
                    })
                }

                request.userId = user.id
                next()
            })
        } else {
            return response.status(401).json({
                error: 'Token de acesso não fornecido.',
            })
        }
    } catch (error) {
        return response.status(500).json({
            error: `Erro interno: ${error}`,
        })
    }
}

module.exports = { authMiddleware }
