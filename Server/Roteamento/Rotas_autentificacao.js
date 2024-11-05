import express  from "express"
import { Login, Registro, Perfil } from "../Controlador/Controlador_autentificacao.js"


const rotas = express.Router()

rotas.post('/Registro', Registro)
rotas.post('/Login', Login)
rotas.get('/Perfil', Perfil);

export {rotas}