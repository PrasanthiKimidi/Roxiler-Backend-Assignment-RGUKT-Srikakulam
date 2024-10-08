require('dotenv').config()
const express = require('express')
const cors=require('cors');
const axios = require('axios')
const app = express()

app.use(cors());

const connection = require('./helpers/connection')
const products = require('./models/Products')

const productRoutes = require('./routes/productRoutes')
app.use(express.json())

app.use(productRoutes);
const port = process.env.port

app.listen(port,()=>{
    console.log("server is running");
})