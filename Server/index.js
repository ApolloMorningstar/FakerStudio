import {createServer} from 'node:http'


const servidor = createServer((requisicao, resposta)=>{
    console.log('Bem vindos ao FakerStudio, uma empresa que pensa no seu Bem-estar')
    resposta.write('Funcionando2')
    return resposta.end()
})

servidor.listen(8000)