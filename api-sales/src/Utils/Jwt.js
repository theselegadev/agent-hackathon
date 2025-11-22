const jwt = require('jsonwebtoken')
// isso é só para teste, não faça isso em casa crianças skskksks.
// Jamais commite isso na main =)
const SECRET_KEY = "my_secret_key_super_secret_lol"

class Jwt{
    static generateToken(payload, expiresIn = '7d'){
        return jwt.sign(payload,SECRET_KEY,{expiresIn})
    }

    static verifyToken(token){
        try{
            return jwt.verify(token,SECRET_KEY);
        }catch(err){
            return null
        }
    }
}

module.exports = Jwt