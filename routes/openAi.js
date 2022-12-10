const express = require('express')
const app = express()

app.use(express.json())
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const routes = express.Router()

routes.post('/generateImage', async (req,res)=>{
    const {prompt,size} = req.body
    console.log(req.body)
    const ImgSize = size==='small'?'256x256':size==='medium'?'512x512':'1024x1024'
try{

  const response = await openai.createImage({
  prompt: prompt,
  n: 1,
  size: ImgSize,
});


    const url = response.data.data[0].url;
    res.status(200).json({url})
}catch(error){
  console.log(error)
    res.status(400).json({error})
}

})




module.exports = routes
