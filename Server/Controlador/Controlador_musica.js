import { Musica, Album, Artista } from '../db.js';

const pegarTodasMusicas = async (req, res) => {
  try {
    const musicas = await Musica.findAll({
      attributes: ['id', 'coverImageUrlMusica', 'titulo', 'duracao', 'fileUrl'],
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
      attributes: ['id', 'coverImageUrlMusica', 'titulo', 'duracao', 'fileUrl'],
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
      where: { album_id: req.params.id },
      attributes: ['id', 'coverImageUrlMusica', 'titulo', 'duracao', 'fileUrl'],
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
    return res.status(500).json({ error: 'Erro ao buscar músicas' });
  }
};

const pegarMusicasPeloArtista = async (req, res) => {
  try {
    const musicas = await Musica.findAll({
      where: { artista_id: req.params.id },
      attributes: ['id', 'coverImageUrlMusica', 'titulo', 'duracao', 'fileUrl'],
      include: [
        { model: Artista, as: 'Artista', attributes: ['nome'] },
        { model: Album, as: 'Album', attributes: ['title'] }
      ]
    });

    if (musicas.length === 0) {
      return res.status(404).json({ error: 'Nenhuma música encontrada para este artista' });
    }

    return res.status(200).json(musicas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro ao buscar músicas' });
  }
};

const criarMusica = async (req, res) => {
  const { titulo, duracao, fileUrl, albumId, artistaId, coverImageUrlMusica } = req.body;
  try {
    const novaMusica = await Musica.create({
      titulo,
      duracao,
      fileUrl,
      albumId,
      artistaId,
      coverImageUrlMusica
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

export { pegarTodasMusicas, pegarMusicaPorId, pegarMusicasPeloAlbum, pegarMusicasPeloArtista, criarMusica,  deletarMusica };
