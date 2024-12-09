import sequelize from '../database.js'
import { DataTypes } from 'sequelize'

const PECA = sequelize.define('epis', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING    
    },
    quantidade:{
        type: DataTypes.INTEGER
    },
    marca: {
        type: DataTypes.STRING
    },
    lote:{
        type: DataTypes.STRING
    },
    tamanho:{
        type: DataTypes.STRING
    },
    preco:{
        type: DataTypes.INTEGER
    },
    preco_custo:{
        type: DataTypes.INTEGER
    }

}, {
    createdAt: false, updatedAt: false, tableName: 'peças'
})

// Verificar se existe a tabela, se não existir vai criar
PECA.sync()

export { PECA }