import sequelize from '../database.js'
import { DataTypes } from 'sequelize'
////nome, email, telefone, cpf
const CLIENTE = sequelize.define('cliente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING    
    },
    email:{
        type: DataTypes.STRING
    },
    telefone: {
        type: DataTypes.STRING 
    },
    cpf: {
        type: DataTypes.INTEGER
    }
}, {
    createdAt: false, updatedAt: false, tableName: 'cliente'
})

CLIENTE.sync()

export { CLIENTE }