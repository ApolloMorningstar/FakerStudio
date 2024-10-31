import Sequelize from 'sequelize'

const sequelize = new Sequelize(
    'SpotFake',
    'postgres',
    'postgres',
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres'
    }
)
const User = sequelize.define('user', { //criação de tabela
    Nome: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    Sobrenome: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    Email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    DataNascimento: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    Senha: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.DataTypes.ENUM('ativo', 'inativo'),
        allowNull: false,
        defaultValue: 'inativo'
    },
    cpf: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    }
})

const criarTabelas = () => {
    sequelize.authenticate().then(() => {
        console.log('conectou')
    })
        .catch((err) => {
            console.log(err)
        })
    sequelize.sync({ force: true }).then(() => {
        console.log('tabela criada')
    })
}

export { User, sequelize, criarTabelas };
