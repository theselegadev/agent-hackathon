const Jwt = require('../Utils/Jwt')
const Response = require('../Utils/Response')

function AuthMiddleware(req,res,next){
    const authHeader = req.headers['authorization']

    if(!authHeader)
        return res.status(401).send(Response.error("Usuário não autenticado"))
    
    
    const token = authHeader.split(' ')[1]
    const tokenValid = Jwt.verifyToken(token)

    if(!tokenValid)
        return res.status(401).send(Response.error("Usuário não autenticado"))

    req.user = tokenValid

    next();
}

module.exports = AuthMiddleware


