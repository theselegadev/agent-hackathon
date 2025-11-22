const BusinessRepository = require("../Repositories/BusinessRepository")

class BusinessController{
    static async create({idUser,name,activity,description}){
        const data = await BusinessRepository.create({idUser,name,activity,description})

        if(data)
            return data

        return null
    }
}

module.exports = BusinessController