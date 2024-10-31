import { User } from "./db.js";
import  bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";




const Registro = async (requisicao, resposta) => {
    const {Nome, Sobrenome, Email, Senha, DataNascimento} = requisicao.body
    if(!Nome || !Sobrenome || !Email || !Senha || !DataNascimento ){
        resposta.send('Você deve preencher todos os campos')
        return
    }
    const userExiste = await User.findOne({where: {Email:Email}})
    if (userExiste){
        resposta.send('Usuário já existe')
        return
    }
    const senhaCriptografada = bcryptjs.hashSync(Senha, 10)
    const usuarioCriado = await User.create({Nome, Sobrenome, Email, Senha: senhaCriptografada, DataNascimento})
    resposta.send('Usuário Criado com sucesso')

}

const Login = async (requisicao, resposta) => {
    const { Email, Senha} = requisicao.body
    if(!Email || !Senha ){
        resposta.send('Você deve preencher todos os campos')
        return
    }
    const userExiste = await User.findOne({where: {Email:Email}})
    if (!userExiste){
        resposta.send('Usuário não existe')
        return
    }
    const senhaValida = bcryptjs.compareSync(Senha, userExiste.Senha)
    if(!senhaValida){
    resposta.send('Senha Inválida')
    return
    }
    const token = jsonwebtoken.sign(
        {
            "Nome_Completo": `${userExiste.Nome} ${userExiste.Sobrenome}`,
            "Email": userExiste.Email,
            "status": userExiste.status
        },
        'chavecriptografiajwt',
        {expiresIn: 1000*60*5}
    )


    res.send({
        msg: "ok usuario logado",
        tokenJWT: token
    })
}

export { Registro, Login }
