import { User } from "../db.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

const ChangePerfil = async (requisicao, resposta) => {
    const token = requisicao.headers.authorization?.split(" ")[1];
    if (!token) {
        return resposta.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jsonwebtoken.verify(token, 'chavecriptografiajwt');
        const user = await User.findOne({ where: { Email: decoded.Email } });
        if (!user) {
            return resposta.status(404).json({ message: 'Usuário não encontrado' });
        }

        const { Nome, Sobrenome, Email, Senha, DataNascimento, imagemUri } = requisicao.body;
        await user.update({
            Nome,
            Sobrenome,
            Email,
            Senha,
            DataNascimento,
            imagemUri 
        });

        resposta.status(200).json({
            Nome_Completo: `${user.Nome} ${user.Sobrenome}`,
            Email: user.Email,
            status: user.status,
            imagemUri: user.imagemUri 
        });
    } catch (error) {
        return resposta.status(401).json({ message: 'Token inválido ou expirado' });
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
        { expiresIn: '5m' } 
    );

    return resposta.status(200).json({
        message: "Usuário logado com sucesso",
        tokenJWT: token,
        id: userExiste.id
    });
};

export { Registro, Login, ChangePerfil };





















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


















// import { User } from "../db.js";
// import bcryptjs from "bcryptjs";
// import jsonwebtoken from "jsonwebtoken";

// const Perfil = async (requisicao, resposta) => {
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

//         resposta.status(200).json({
//             Nome_Completo: `${user.Nome} ${user.Sobrenome}`,
//             Email: user.Email,
//             status: user.status
//         });
//     } catch (error) {
//         return resposta.status(401).json({ message: 'Token inválido ou expirado' });
//     }
// };

// const Registro = async (requisicao, resposta) => {
//     const { Nome, Sobrenome, Email, Senha, DataNascimento } = requisicao.body;
//     if (!Nome || !Sobrenome || !Email || !Senha || !DataNascimento) {
//         return resposta.status(400).send('Você deve preencher todos os campos');
//     }

//     const userExiste = await User.findOne({ where: { Email: Email } });
//     if (userExiste) {
//         return resposta.status(409).send('Usuário já existe'); // 409 Conflict
//     }

//     const senhaCriptografada = bcryptjs.hashSync(Senha, 10);
//     await User.create({ Nome, Sobrenome, Email, Senha: senhaCriptografada, DataNascimento });
//     return resposta.status(201).send('Usuário criado com sucesso'); // 201 Created
// };

// const Login = async (requisicao, resposta) => {
//     const { Email, Senha } = requisicao.body;
//     if (!Email || !Senha) {
//         return resposta.status(400).send('Você deve preencher todos os campos');
//     }

//     const userExiste = await User.findOne({ where: { Email: Email } });
//     if (!userExiste) {
//         return resposta.status(404).send('Usuário não existe');
//     }

//     const senhaValida = bcryptjs.compareSync(Senha, userExiste.Senha);
//     if (!senhaValida) {
//         return resposta.status(401).send('Senha inválida');
//     }

//     const token = jsonwebtoken.sign(
//         {
//             "Nome_Completo": `${userExiste.Nome} ${userExiste.Sobrenome}`,
//             "Email": userExiste.Email,
//             "status": userExiste.status
//         },
//         'chavecriptografiajwt',
//         { expiresIn: '5m' } // Melhor usar uma string para a duração
//     );

//     return resposta.status(200).json({
//         message: "Usuário logado com sucesso",
//         tokenJWT: token
//     });
// };

// export { Registro, Login, Perfil };
