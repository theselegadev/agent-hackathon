const db = require("../config/ConnectDB")

class SalesRepository{
    static async create({idBusiness,type,product,value,client,date}){
        
        const sql = `INSERT INTO vendas(id_negocio,tipo,produto,valor,cliente,data) VALUES (?,?,?,?,?,?)`
        
        try{
            const [res] = await db.execute(sql,[idBusiness,type,product,value,client,date])

            if(res)
                return {type, value, client, date}

            return null
        }catch(err){
            console.error("Erro ao cadastrar venda ", err)
            return null
        }
    }

    static async filterSales({product,value,client,date},idBusiness){
        let sql = `SELECT tipo,produto,valor,cliente,data FROM vendas WHERE id_negocio = ? `
        const values = [idBusiness]

        if(product){
            sql+=`AND produto = ? `
            values.push(product)
        }

        if(value){
            sql+=`AND valor = ? `
            values.push(value)
        }

        if(client){
            sql+=`AND cliente = ? `
            values.push(client)
        }

        if(date){
            sql+=`AND data = ? `
            values.push(date)
        }

        try{
            const [sales] = await db.execute(sql,values)

                return sales.length > 0 ? sales : null
        }catch(err){
            console.error("Ocorreu um erro no filtro de vendas ", err)
            return null
        }
    }

    static async getByMonth(month,idBusiness){
        const sql = `SELECT tipo,produto,valor,cliente,data FROM vendas WHERE id_negocio = ? AND MONTH(data) = ? AND YEAR(data) = 2025`

        try{
            const [sales] = await db.execute(sql,[idBusiness,month])

            return sales.length > 0 ? sales : null
        }catch(err){
            console.error("Ocorreu um erro ao buscar vendas por mês ",err)
            return null
        }
    }

    static async getAll(idBusiness){
        const sql = `SELECT tipo,produto,valor,cliente,data FROM vendas WHERE id_negocio = ?`

        try{
            const [sales] = await db.execute(sql,[idBusiness])

            return sales.length > 0 ? sales : null
        }catch(err){
            console.error("Ocorreu um erro ao buscar todas as vendas ",err)
            return null
        }
    }
}

module.exports = SalesRepository