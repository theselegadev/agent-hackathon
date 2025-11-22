const express = require('express');
const router = express.Router();

router.post('/prompt',(req,res)=>{
    res.send({message: "Prompt received", data: req.body.prompt});
})