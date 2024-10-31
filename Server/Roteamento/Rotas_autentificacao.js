import express  from "express"
import { Login, Registro } from "../Controlador/Controlador_autentificacao.js"


const rotas = express.Router()

rotas.post('/Registro', Registro)
rotas.post('/Login', Login)

export {rotas}