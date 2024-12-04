import express  from "express"
import { Login, Registro, ChangePerfil, Senha } from "../Controlador/Controlador_autentificacao.js"


const rotas = express.Router()

rotas.post('/Registro', Registro)
rotas.post('/Login', Login)
rotas.put('/ChangePerfil', ChangePerfil);
rotas.put('/Senha:id', Senha);


export {rotas}