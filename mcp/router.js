const express = require('express');
const port = 8082
const app = express();

app.post('/prompt',(req,res)=>{
    res.send({message: "Prompt received", data: req.body.prompt});
})

app.listen(port)