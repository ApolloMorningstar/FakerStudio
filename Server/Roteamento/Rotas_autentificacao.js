import express  from "express"
import { Login, Registro, ChangePerfil, Senha } from "../Controlador/Controlador_autentificacao.js"
// import { Login, Registro, ChangePerfil, editarPerfil } from "../Controlador/Controlador_autentificacao.js"


const rotas = express.Router()

rotas.post('/Registro', Registro)
rotas.post('/Login', Login)
rotas.put('/ChangePerfil', ChangePerfil);
rotas.put('/Senha:id', Senha);

// rotas.put('/editarPerfil', editarPerfil )

export {rotas}