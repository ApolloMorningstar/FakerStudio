import { Artista, Album, Musica } from '../db.js';


const pegarTodasMusicas = async (req, res) => {
  try {
    const musicas = await Musica.findAll({
      include: [
        { model: Album, as: 'Album', attributes: ['title'] },
        { model: Artista, as: 'Artista', attributes: ['nome'] }
      ]
    });
    return res.status(200).json(musicas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao buscar músicas' });
  }
};

const pegarMusicaPorId = async (req, res) => {
  try {
    const musica = await Musica.findByPk(req.params.id, {
      include: [
        { model: Album, as: 'Album', attributes: ['title'] },
        { model: Artista, as: 'Artista', attributes: ['nome'] }
      ]
    });
    if (!musica) {
      return res.status(404).json({ error: 'Música não encontrada' });
    }
    return res.status(200).json(musica);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao buscar música' });
  }
};

const pegarMusicasPeloAlbum = async (req, res) => {
  try {
    const musicas = await Musica.findAll({
      where: { albumId: req.params.albumId },
      include: [
        { model: Album, as: 'Album', attributes: ['title'] },
        { model: Artista, as: 'Artista', attributes: ['nome'] }
      ]
    });
    if (musicas.length === 0) {
      return res.status(404).json({ error: 'Nenhuma música encontrada para este álbum' });
    }
    return res.status(200).json(musicas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao buscar músicas pelo álbum' });
  }
};

const pegarMusicasPeloArtista = async (req, res) => {
  try {
    const musicas = await Musica.findAll({
      where: { artistaId: req.params.artistaId },
      include: [
        { model: Album, as: 'Album', attributes: ['title'] },
        { model: Artista, as: 'Artista', attributes: ['nome'] }
      ]
    });
    if (musicas.length === 0) {
      return res.status(404).json({ error: 'Nenhuma música encontrada para este artista' });
    }
    return res.status(200).json(musicas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao buscar músicas pelo artista' });
  }
};

const criarMusica = async (req, res) => {
  const { titulo, duracao, fileUrl, albumId, artistaId } = req.body;
  try {
    const novaMusica = await Musica.create({
      titulo,
      duracao,
      fileUrl,
      albumId,
      artistaId
    });
    return res.status(201).json(novaMusica);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao criar música' });
  }
};

const deletarMusica = async (req, res) => {
  const { id } = req.params;
  try {
    const musica = await Musica.findByPk(id);
    if (!musica) {
      return res.status(404).json({ error: 'Música não encontrada' });
    }
    await musica.destroy();
    return res.status(200).json({ message: 'Música deletada com sucesso' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao deletar música' });
  }
};

export { pegarTodasMusicas, pegarMusicaPorId, pegarMusicasPeloAlbum, pegarMusicasPeloArtista, criarMusica, deletarMusica };
