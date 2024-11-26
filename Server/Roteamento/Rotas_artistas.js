import express  from "express"
import { pegarTodosArtistas, pegarArtistaPorId, pegarAlbumsPorArtista } from "../Controlador/Controlador_artista.js";
const rotas_Artista = express.Router();

rotas_Artista.get('/', pegarTodosArtistas);
rotas_Artista.get('/:id', pegarArtistaPorId);
rotas_Artista.get('/:id/Albuns/', pegarAlbumsPorArtista);

export {rotas_Artista};