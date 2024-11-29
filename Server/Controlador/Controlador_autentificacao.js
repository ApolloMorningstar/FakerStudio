import { User } from "../db.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";




const editarPerfil = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jsonwebtoken.verify(token, 'chavecriptografiajwt');
        const user = await User.findOne({ where: { Email: decoded.Email } });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const { Nome, Sobrenome, Email, Senha, DataNascimento, imagemUri } = req.body;

        let senhaCriptografada = user.Senha;
        if (Senha) {
            senhaCriptografada = bcryptjs.hashSync(Senha, 10);
        }

        await user.update({
            Nome: Nome || user.Nome,
            Sobrenome: Sobrenome || user.Sobrenome,
            Email: Email || user.Email,
            Senha: senhaCriptografada,
            DataNascimento: DataNascimento || user.DataNascimento,
            imagemUri: imagemUri || user.imagemUri
        });

        res.status(200).json({ message: 'Perfil atualizado com sucesso!' });
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};





// const ChangePerfil = async (requisicao, resposta) => {
//     const token = requisicao.headers.authorization?.split(" ")[1];
//     if (!token) {
//         return resposta.status(401).json({ message: 'Token não fornecido' });
//     }

//     try {
//         const decoded = jsonwebtoken.verify(token, 'chavecriptografiajwt');
//         const user = await User.findOne({ where: { Email: decoded.Email } });
        
//         if (!user) {
//             return resposta.status(404).json({ message: 'Usuário não encontrado' });
//         }

//         const { Nome, Sobrenome, Email, Senha, DataNascimento, imagemUri } = requisicao.body;

//         let senhaCriptografada = user.Senha;  
//         if (Senha) {
//             senhaCriptografada = bcryptjs.hashSync(Senha, 10);
//         }

//         await user.update({
//             Nome: Nome || user.Nome,
//             Sobrenome: Sobrenome || user.Sobrenome,
//             Email: Email || user.Email,
//             Senha: senhaCriptografada,
//             DataNascimento: DataNascimento || user.DataNascimento,
//             imagemUri: imagemUri || user.imagemUri
//         });

//         resposta.status(200).json({
//             Nome_Completo: `${user.Nome} ${user.Sobrenome}`,
//             Email: user.Email,
//             DataNascimento: DataNascimento || user.DataNascimento,
//             status: user.status,
//             imagemUri: user.imagemUri 
//         });
//     } catch (error) {
//         console.error(error);
//         return resposta.status(500).json({ message: 'Erro ao atualizar o perfil' });
//     }
// };


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

export { Registro, Login, ChangePerfil };

// export { Registro, Login, ChangePerfil, editarPerfil };





















// import { User } from "../db.js";
// import  bcryptjs from "bcryptjs";
// import jsonwebtoken from "jsonwebtoken";


// const Perfil = async (requisicao, resposta) => {
//     const token = requisicao.headers.authorization.split(" ")[1];
//     try {
//         const decoded = jsonwebtoken.verify(token, 'chavecriptografiajwt');
//         const user = await User.findOne({ where: { Email: decoded.Email } });
//         if (!user) {
//             return resposta.status(404).json({ message: 'Usuário não encontrado' });
//         }

//         resposta.status(200).json({
//             Nome_Completo: `${user.Nome} ${user.Sobrenome}`,
//             Email: user.Email,
//             status: user.status
//         });
//     } catch (error) {
//         resposta.status(401).json({ message: 'Token inválido ou expirado' });
//     }
// };



// const Registro = async (requisicao, resposta) => {
//     const {Nome, Sobrenome, Email, Senha, DataNascimento} = requisicao.body
//     if(!Nome || !Sobrenome || !Email || !Senha || !DataNascimento ){
//         resposta.send('Você deve preencher todos os campos')
//         return
//     }
//     const userExiste = await User.findOne({where: {Email:Email}})
//     if (userExiste){
//         resposta.send('Usuário já existe')
//         return
//     }
//     const senhaCriptografada = bcryptjs.hashSync(Senha, 10)
//     const usuarioCriado = await User.create({Nome, Sobrenome, Email, Senha: senhaCriptografada, DataNascimento})
//     resposta.send('Usuário Criado com sucesso')

// }

// const Login = async (requisicao, resposta) => {
//     const { Email, Senha} = requisicao.body
//     if(!Email || !Senha ){
//         resposta.send('Você deve preencher todos os campos')
//         return
//     }
//     const userExiste = await User.findOne({where: {Email:Email}})
//     if (!userExiste){
//         resposta.send('Usuário não existe')
//         return
//     }
//     const senhaValida = bcryptjs.compareSync(Senha, userExiste.Senha)
//     if(!senhaValida){
//     resposta.send('Senha Inválida')
//     return
//     }
//     const token = jsonwebtoken.sign(
//         {
//             "Nome_Completo": `${userExiste.Nome} ${userExiste.Sobrenome}`,
//             "Email": userExiste.Email,
//             "status": userExiste.status
//         },
//         'chavecriptografiajwt',
//         {expiresIn: 1000*60*5}
//     )


//     resposta.status(200).json({
//         message: "Usuário logado com sucesso",
//         tokenJWT: token
//     });    
// }

// export { Registro, Login, Perfil }