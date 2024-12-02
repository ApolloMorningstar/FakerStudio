import { User } from "../db.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";


const ChangePerfil = async (requisicao, resposta) => {
    const tokenJWT = requisicao.headers.authorization?.split(" ")[1];
    if (!tokenJWT) {
        return resposta.status(401).json({ message: 'Token não fornecido' });
    }

    console.log("Token recebido:", tokenJWT);

    try {
        const decoded = jsonwebtoken.verify(tokenJWT, 'chavecriptografiajwt');
        console.log("Token decodificado:", decoded);

        const user = await User.findOne({ where: { Email: decoded.Email } });
        if (!user) {
            return resposta.status(404).json({ message: 'Usuário não encontrado' });
        }

        const { Nome, Sobrenome, Email, Senha, DataNascimento, imagemUri } = requisicao.body;

        let senhaCriptografada = user.Senha;
        if (Senha) {
            console.log("Senha recebida para criptografar:", Senha);
            senhaCriptografada = bcryptjs.hashSync(Senha, 10);
            console.log("Senha criptografada:", senhaCriptografada);
        }

        console.log("Dados recebidos no body:", requisicao.body);

        await user.update({
            Nome: Nome || user.Nome,
            Sobrenome: Sobrenome || user.Sobrenome,
            Email: Email || user.Email,
            DataNascimento: DataNascimento || user.DataNascimento,
            Senha: senhaCriptografada,  
            imagemUri: imagemUri || user.imagemUri 
        });

        resposta.status(200).json({
            Nome_Completo: user.Nome,
            Sobrenome: user.Sobrenome,
            Email: user.Email,
            DataNascimento: user.DataNascimento,
            status: user.status,
            imagemUri: user.imagemUri
        });
    } catch (error) {
        console.error("Erro ao verificar o token:", error);
        if (error.name === 'TokenExpiredError') {
            return resposta.status(401).json({ message: 'Token expirado' });
        } else if (error.name === 'JsonWebTokenError') {
            return resposta.status(402).json({ message: 'Token inválido' });
        } else {
            return resposta.status(403).json({ message: 'Erro na verificação do token' });
        }
    }
};


const Registro = async (requisicao, resposta) => {
    const { Nome, Sobrenome, Email, Senha, DataNascimento } = requisicao.body;
    if (!Nome || !Sobrenome || !Email || !Senha || !DataNascimento) {
        return resposta.status(400).send('Você deve preencher todos os campos');
    }

    const userExiste = await User.findOne({ where: { Email: Email } });
    if (userExiste) {
        return resposta.status(409).send('Usuário já existe'); 
    }

    const senhaCriptografada = bcryptjs.hashSync(Senha, 10);
    await User.create({ Nome, Sobrenome, Email, Senha: senhaCriptografada, DataNascimento });
    return resposta.status(201).send('Usuário criado com sucesso'); 
};

const Senha = async (req, res) => {
    const user_id = req.params.id;
    const nova_senha = req.body.novaSenha;

    if (!nova_senha) {
        return res.status(400).send('Todos os campos devem ser preenchidos');
    }

    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
        return res.status(404).send('Usuário não encontrado');
    }

    const senhaCriptografada = bcryptjs.hashSync(nova_senha, 10);
    user.Senha = senhaCriptografada;  
    await user.save();

    res.status(200).send('Senha alterada com sucesso');
};


const Login = async (requisicao, resposta) => {
    const { Email, Senha } = requisicao.body;
    if (!Email || !Senha) {
        return resposta.status(400).send('Você deve preencher todos os campos');
    }

    const userExiste = await User.findOne({ where: { Email: Email } });
    if (!userExiste) {
        return resposta.status(404).send('Usuário não existe');
    }

    const senhaValida = bcryptjs.compareSync(Senha, userExiste.Senha);
    if (!senhaValida) {
        return resposta.status(401).send('Senha inválida');
    }

    const token = jsonwebtoken.sign(
        {
            "Nome_Completo": `${userExiste.Nome} ${userExiste.Sobrenome}`,
            "Email": userExiste.Email,
            "status": userExiste.status
        },
        'chavecriptografiajwt',
        {expiresIn: 1000*60*5}
    );

    return resposta.status(200).json({
        message: "Usuário logado com sucesso",
        tokenJWT: token,
        id: userExiste.id
    });
};

export { Registro, Login, ChangePerfil, Senha };








