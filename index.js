const express = require('express')
const path = require('path')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT||5000;
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.use('/openai',require('./routes/openAi'))
app.listen(PORT,()=>{
    console.log("server running on port" + PORT);
})

app.get('/',(req,res)=>{
   return  res.send(path.join(__dirname,'public/index.html'));
})