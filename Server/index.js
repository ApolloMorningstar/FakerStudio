import  Express  from "express";
import cors from "cors"
import { criarTabelas } from "./db.js";
import { rotas } from "./Roteamento/Rotas_autentificacao.js";
import { rotasUsuarios } from "./Roteamento/Rotas_usuarios.js";

const app = Express()
app.use(Express.json())
app.use(cors())
criarTabelas()

app.use('/autentificacao', rotas),
app.use('/usuarios', rotasUsuarios)


app.listen(8000)