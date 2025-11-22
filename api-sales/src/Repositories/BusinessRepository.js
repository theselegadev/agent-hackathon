const db = require('../config/ConnectDB')

class BusinessRepository{
    static async create({idUser,name, activity, description}){
        const sql = `INSERT INTO negocio(id_user, nome, atuacao, descricao) VALUES(?,?,?,?)`;

        try{
            const [res] = await db.execute(sql,[idUser,name,activity,description])
            
            if (res)
                return {id: res.insertId, name}

            return null
        }catch(err){
            console.log("Erro ao cadastrar negócio ", err)
            return null
        }
    }   
}

module.exports = BusinessRepository