
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
        defaultValue: 'inativo',
    }
    })
    const Artista = sequelize.define('Artist', {
        nome: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        bio: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
        },
        imageUrl: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
        }
    })


    const Album = sequelize.define('Album', {
        title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        releaseYear: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        coverImageUrl: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
        },
    });

    Album.belongsTo(Artista, {
        foreignKey: 'artistaId',
        onDelete: 'CASCADE',
    });

    Artista.hasMany(Album, {
        foreignKey: 'artistaId',
        as: 'Albums'
    });

    const Musica = sequelize.define('Musica', {
        coverImageUrl: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
        },
        titulo: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        duracao: {
            type: Sequelize.DataTypes.INTEGER,  
            allowNull: false,
        },
        fileUrl: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
    });
    Musica.belongsTo(Album, {
        foreignKey: 'albumId',
        onDelete: 'CASCADE',
        as: 'Album'
    });
    Musica.belongsTo(Artista, {
        foreignKey: 'artistaId',
        onDelete: 'CASCADE',
        as: 'Artista'
    });
      
    Album.hasMany(Musica, {
        foreignKey: 'albumId',
        as: 'Musicas'
    });

    const criarTabelas = () => {
        sequelize.authenticate().then(() => {
            console.log('conectou')
        })
            .catch((err) => {
                console.log(err)
            })
        sequelize.sync({ alter: true }).then(() => {
            console.log('tabela criada')
        })
    }

    export { User, sequelize, criarTabelas, Artista, Album, Musica };
