import { User } from "../db.js"

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await User.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar usuários' });
    }
};

const encontrarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await User.findByPk(id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao encontrar usuário' });
    }
};


export { listarUsuarios, encontrarUsuario }