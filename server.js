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




//CRUD
//excluir
app.post('/delete/:id',async (req,res)=>{
    const id=req.params.id
    const query=`
    DELETE FROM tarefas WHERE id = $1
    `
    const result=await pool.query(query,[id])
    if(result.rowCount>0){
        res.send(`
            <script>
                alert("tarefa deletada com sucesso")
                window.location.href='/'
            </script>   
            `)
    }
    else{
        res.send(`
            <script>
                alert("não foi possível deletar a tarefa")
                window.location.href='/'
            </script>   
            `)    
    }
})

//adicionar
app.post('/add', async(req,res)=>{
    const {titulo,descricao} = req.body
    const query=
    `
    INSERT INTO tarefas(titulo,descricao)
    values($1,$2)
    `
    const result=await pool.query(query,[titulo,descricao])
    if(result.rowCount>0){
        res.send(`
            <script>
            alert("tarefa adicionada")
            window.location.href='/'
            </script>
            `)
    }
})

app.listen(PORT,()=>{
    console.log(`rodando em http://localhost:${PORT}`)
})
