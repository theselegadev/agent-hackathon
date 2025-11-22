const express = require('express')
const router = require('./Routes/router')
const app = express()
const port = 8080

app.use(express.json())
app.use(router)

app.listen(port)