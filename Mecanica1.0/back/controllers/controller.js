import { PECA } from "../models/PECA.js"
import { CLIENTE } from "../models/CLIENTE.js"
import { RELATORIO } from "../models/Relatorio.js"

const cadastrarPeca = async (req, res) => {
    try {
        const { nome, quantidade, marca, lote, tamanho, preco, preco_custo } = req.body
        if (!nome || !quantidade || !marca || !lote || !tamanho || !preco || !preco_custo) {
            return res.status(400).send({ mensagem: 'Favor informar todos os campos' })
        }

        const peca = await PECA.create({ nome, quantidade })

        res.status(201).send({ mensagem: 'Peça cadastrado com sucesso!', epi })

    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

const cadastrarCliente = async (req, res) => {
    try {
        const { nome, email, telefone, cpf } = req.body
        if (!nome || !email || !telefone || !cpf) {
            return res.status(400).send({ mensagem: 'Favor informar todos os campos necessários' })
        }

        const cliente = await CLIENTE.create({ nome, email, telefone, cpf })

        res.status(201).send({ mensagem: 'Funcionário cadastrado com sucesso!', cliente })
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

/**const relatorio = async (req, res) => {
    try {
        const { idFuncionario, nomeFuncionario, idEpi, nomeEpi, quantidade, data, statuss } = req.body

        await RELATORIO.create({ idFuncionario, nomeFuncionario, idEpi, nomeEpi, quantidade, data, statuss })

        res.status(201).send({ mensagem: "Relatório registrado com sucesso" })

    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}**/

/**const listaRelatorio = async (req, res) => {
    try {
        const lista_relatorio = await RELATORIO.findAll({
            order: [['data', 'DESC']] 
        })
        res.status(200).send(lista_relatorio)
    } catch (erro) {
        res.status(500).send({ mensagem: 'Erro ao exibir relatório' })
    }
}**/

/**const listaRelatorioFuncionario = async (req, res) => {
    const { id } = req.params

    try {
        const lista_relatorio = await RELATORIO.findAll({
            where: { idFuncionario: id },
            order: [['data', 'DESC']] 
        })

        if (lista_relatorio.length === 0) {
            return res.status(204).send({ mensagem: 'Nenhum relatório encontrado para este funcionário.' })
        }

        res.status(200).send(lista_relatorio)

    } catch (erro) {
        console.error('Erro ao buscar relatórios:', erro)
        res.status(500).send({ mensagem: 'Erro ao exibir relatórios. Tente novamente mais tarde.' })
    }
}**/

/**const listaRelatorioEPI = async (req, res) => {
    const { id } = req.params

    try {
        const lista_relatorio = await RELATORIO.findAll({
            where: { idEpi: id },
            order: [['data', 'DESC']] // Ordena pela data em ordem decrescente
        })
        if (lista_relatorio.length === 0) {
            return res.status(204).send({ mensagem: 'Nenhum relatório encontrado para este EPI.' })
        }

        res.status(200).send(lista_relatorio)
    } catch (erro) {
        console.error('Erro ao buscar relatórios:', erro)
        res.status(500).send({ mensagem: 'Erro ao exibir relatórios. Tente novamente mais tarde.' })
    }
}**/

const clientes = async (req, res) => {
    try {
        const listaCliente = await FUNCIONARIO.findAll()
        res.status(200).send(listaCliente)
    } catch (erro) {
        res.status(500).send({ mensagem: 'Erro ao buscar cliente', cliente })
    }
}

const cliente = async (req, res) => {
    const { id } = req.params
    try {
        const clienteEncontrado = await CLIENTE.findByPk(id)
        if (!clienteEncontrado) {
            return res.status(404).send({ mensagem: 'Cliente não encontrado' })
        }
        res.status(200).send(clienteEncontrado)
    } catch (erro) {
        console.error(erro)
        res.status(500).send({ mensagem: 'Erro ao buscar cliente' })
    }
}

const peca = async (req, res) => {
    const { id } = req.params
    try {
        const pecaEncontrado = await PECA.findByPk(id)
        if (!pecaEncontrado) {
            return res.status(404).send({ mensagem: 'Peça não encontrada' })
        }
        res.status(200).send(pecaEncontrado)
    } catch (erro) {
        console.error(erro)
        res.status(500).send({ mensagem: 'Erro ao buscar peça' })
    }
}

const pecas = async (req, res) => {
    try {
        const listaPecas = await PECA.findAll()
        res.status(200).send(listaPecas)
    } catch (erro) {
        res.status(500).send({ mensagem: 'Erro ao buscar peças' })
    }
}

const atualizarCliente = async (req, res) => {
    try {        
        const id = req.params.id
        const { nome, email, telefone, cpf } = req.body
        const atualizar = await CLIENTE.update({ nome, email, telefone, cpf }, { where: { id } })
        res.status(200).send({ mensagem: "Cadastro de cliente atualizado" })
    
    } catch (erro) {

        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

const apagarCliente = async (req, res) => {
    try {

        const id = req.params.id

        const cliente = await CLIENTE.findOne({ where: { id } })
        if (!cliente) {
            return res.status(404).send({ mensagem: 'Cliente não encontrado.' })
        }

        await CLIENTE.destroy({ where: { id } })  

        res.status(200).send({ mensagem: 'Cadastro de cliente apagado com sucesso' })
    
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

const atualizarPeca = async (req, res) => {

    try {
        const id = req.params.id
        const { nome, quantidade, marca, lote, tamanho, preco, preco_custo } = req.body
        const atualizar = await PECA.update({ nome, quantidade, marca, lote, tamanho, preco, preco_custo }, { where: { id } })
        res.status(200).send({ mensagem: "Peça atualizado", atualizar })
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

const apagarPeca = async (req, res) => {

    try {
        const id = req.params.id

        const peca = await PECA.findOne({ where: { id } })
        if (!peca) {
            return res.status(404).send({ mensagem: 'Peça não encontrada.' })
        }

        await PECA.destroy({ where: { id } })
        res.status(200).send({ mensagem: 'Peça apagada com sucesso' })
    } catch (erro) {
        console.log(erro)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

export {
    cadastrarPeca, cadastrarCliente, clientes, cliente, peca, pecas, atualizarCliente, apagarCliente, atualizarPeca, apagarPeca, 

}
