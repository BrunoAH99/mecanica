import { Sequelize } from 'sequelize'

const conexao = new Sequelize('postgresql://bruno:HTKnVv8ZOkOb15kF0Ir8-A@bruno-hillesheim-3719.jxf.gcp-southamerica-east1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full')

try {
    await conexao.authenticate()
    console.log('Banco conectado com sucesso')
} catch (error) {
    console.error('Erro ao conectar', error)
}

export default conexao
