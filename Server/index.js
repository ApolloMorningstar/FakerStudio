import  Express  from "express";
import cors from "cors"
import { rotas } from "./Roteamento/Rotas_autentificacao.js";

const app = Express()
app.use(Express.json())
app.use(cors())
//criarTabelas()

app.use('/autentificacao', rotas)


app.listen(8000)