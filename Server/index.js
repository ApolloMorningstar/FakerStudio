import  Express  from "express";
import cors from "cors"
import { criarTabelas } from "./db.js";
import { rotas } from "./Roteamento/Rotas_autentificacao.js";
import { rotasUsuarios } from "./Roteamento/Rotas_usuarios.js";
import {rotas_Artista} from "./Roteamento/Rotas_artistas.js";
import { rotas_Albuns } from "./Roteamento/rotas_album.js";
import { rotas_Musicas } from "./Roteamento/rotas_musicas.js";

const app = Express()
app.use(Express.json())
app.use(cors())
criarTabelas()

app.use('/autentificacao', rotas),
app.use('/usuarios', rotasUsuarios),
app.use('/artista', rotas_Artista),
app.use('/albuns', rotas_Albuns )
app.use('/musicas', rotas_Musicas)

app.listen(8000)