import express from 'express'
import { pegarTodosAlbums, pegarAlbumPorId, pegarMusicaPeloAlbum } from '../Controlador/Controlador_album.js';

const rotas_Albuns = express.Router();

rotas_Albuns.get('/', pegarTodosAlbums);
rotas_Albuns.get('/:id', pegarAlbumPorId); 
rotas_Albuns.get('/:id/musicas/', pegarMusicaPeloAlbum);  

export {rotas_Albuns};