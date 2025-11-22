const express = require("express")
const router = express.Router()
const UserController = require("../Controllers/UserController")
const AuthMiddleware = require("../Middlewares/AuthMiddleware")
const SalesController = require("../Controllers/SalesController")

router.post("/user",UserController.create)

router.post("/login", UserController.login)

router.get("/sale/:month/:idBusiness",SalesController.getByMonth)

router.get("/sales/:idBusiness",SalesController.getAll)

router.post("/sale",SalesController.create)

router.post("/filtersales/:idBusiness",SalesController.filterSales)

module.exports = router