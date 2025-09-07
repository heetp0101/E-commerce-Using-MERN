

const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT

// !important! 
// you need to install the following libraries |express|[dotenv > if required]
// or run this command >> npm i express dotenv 

app.post('/addUser' , (req , res)=>{

   res.send('hello from simple server :)')

})


module.exports = {app};