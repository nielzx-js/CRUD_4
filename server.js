const express = require('express')
const path = require('path')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
const pool = require('./database')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (req,res)=>{
    const query= `
    SELECT * FROM tarefas
    `
    const result = await pool.query(query)
    res.render('index',{tarefas:result.rows})
})



app.listen(PORT,()=>{
    console.log(`rodando em http://localhost:${PORT}`)
})
