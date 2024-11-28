import express from 'express';
import { pegarTodasMusicas, pegarMusicaPorId, pegarMusicasPeloAlbum, pegarMusicasPeloArtista, criarMusica, deletarMusica} from '../Controlador/Controlador_musica.js';

const rotas_Musicas = express.Router();

rotas_Musicas.get('/musicas', pegarTodasMusicas);
rotas_Musicas.get('/musicas/:id', pegarMusicaPorId);
rotas_Musicas.get('/album/:albumId', pegarMusicasPeloAlbum);
rotas_Musicas.get('/artista/:artistaId', pegarMusicasPeloArtista);
rotas_Musicas.post('/musicas', criarMusica);
rotas_Musicas.delete('/musicas/:id', deletarMusica);


export  {rotas_Musicas};



