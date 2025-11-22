const db = require("../config/ConnectDB")

class UserRepository{
    static async create({name,password}){
        const sql = `INSERT INTO user(nome, senha) VALUES(?,?)`

        try{
           const res = await db.execute(sql,[name,password])
           
           return {id: res[0].insertId, name}
        }catch(err){
            console.log("Erro ao criar conta: ", err)

            return null
        }
    }

    static async login({name,password}){
        const sql = `SELECT * FROM user WHERE nome = ? AND senha = ?`;

        try{
            const [rows] = await db.execute(sql,[name,password])
            
            if (rows.length > 0) 
                return {id: rows[0].id, name: rows[0].name}

            return null

        }catch(err){
            console.error("Erro ao efetuar login: ", err)

            return false
        }
    }
}

module.exports = UserRepository