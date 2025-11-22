const UserRepository = require("../Repositories/UserRepository")
const BusinessController = require("../Controllers/BusinessController")
const Response = require("../Utils/Response")
const Jwt = require("../Utils/Jwt")

class UserController{

    static async create(req,res){
        const {name,password,nameBusiness,activity,description} = req.body
        const dataUser = await UserRepository.create({name,password}) 
        const dataBusiness = await BusinessController.create({idUser: dataUser.id, name: nameBusiness,activity,description})      
        const data = {idUser: dataUser.id, idBusiness: dataBusiness.id, nameUser: dataUser.name, nameBusiness: dataBusiness.name}

        const token = Jwt.generateToken({name})

        return res.status(201).send(Response.success("Usuário criado com sucesso",[{data,token}]))
    }

    static async login(req,res){
        const {name,password} = req.body
        const data = await UserRepository.login({name,password})

        if (data){
            const token = Jwt.generateToken({name})
            return res.status(200).send(Response.success("Login com sucesso",[{data,token}]))
        }

        return res.status(400).send(Response.error("Nome ou senha incorretos"))
    }
}

module.exports = UserController