const jwt = require('jsonwebtoken')

function verificarToken(req, res, next) {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ erro: 'Token não informado' })
    }

    try {
        const dados = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET)
        req.usuario = dados
        next()
    } catch (erro) {
        return res.status(403).json({ erro: 'Token inválido' })
    }
}

module.exports = verificarToken