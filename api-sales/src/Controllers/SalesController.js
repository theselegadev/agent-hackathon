const SalesRepository = require("../Repositories/SalesRepository")
const Response = require("../Utils/Response")

class SalesController{
    static async create(req,res){
        const data = await SalesRepository.create(req.body)
        
        if(data)
            return res.status(201).send(Response.success(`venda de ${data.type} cadastro com sucesso no valor de R$${data.value} para ${data.client} na data ${new Intl.DateTimeFormat("pt-BR").format(new Date(data.date))}`))

        return res.status(500).send(Response.error("Ocorreu algum erro no cadastro da venda"))
    }

    static async filterSales(req,res){
        const sales = await SalesRepository.filterSales(req.body,req.params.idBusiness)
        
        if(sales)
            return res.status(200).send(Response.success("Vendas filtradas com sucesso",sales))

        res.status(404).send(Response.error("Nenhuma venda encontrada"))
    }

    static async getByMonth(req,res){
        const sales = await SalesRepository.getByMonth(req.params.month,req.params.idBusiness)

        if(sales)
            return res.status(200).send(Response.success("Vendas retornadas com sucesso", sales))

        return res.status(404).send(Response.error("Nenhuma venda encontrada"))
    }

    static async getAll(req,res){
        const sales = await SalesRepository.getAll(req.params.idBusiness)

        if(sales)
            return res.status(200).send(Response.success("Vendas retornadas com sucesso",sales))

        return res.status(404).send(Response.error("Nenhuma venda encontrada"))
    }
}

module.exports = SalesController