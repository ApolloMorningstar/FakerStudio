import  Express  from "express";
import cors from "cors"
import {rotas} from './Roteamento/rotas_autenticacao.js'

const app = Express()
app.use(Express.json())
app.use(cors())
// criarTabelas()

app.use('/autenticacao', rotas)


app.listen(8000)