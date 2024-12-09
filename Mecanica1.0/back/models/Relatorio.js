import sequelize from '../database.js'
import { DataTypes } from 'sequelize'

const RELATORIO = sequelize.define('relatorio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    idCliente: {
        type: DataTypes.STRING    
    },
    nomeCliente: {
        type: DataTypes.STRING
    },
    idPeca: {
        type: DataTypes.STRING    
    },
    nomePeca:{
        type: DataTypes.STRING
    },
}, {
    createdAt: false, updatedAt: false, tableName: 'relatorio'
})

RELATORIO.sync()
// RELATORIO.sync({ force: true })

export { RELATORIO }