class Respose{
    static success(message,data = []){
        return {status: "success", message, data}
    }
    static error(message,data = []){
        return {status:"error", message, data}
    }
}

module.exports = Respose