import { PECA } from "../models/PECA.js";
import { CLIENTE } from "../models/CLIENTE.js";
import { RELATORIO } from "../models/Relatorio.js";

const cadastrarPeca = async (req, res) => {
    try {
        const { nome, quantidade, marca, lote, tamanho, preco, preco_custo } = req.body;
        if (!nome || !quantidade || !marca || !lote || !tamanho || !preco || !preco_custo) {
            return res.status(400).send({ mensagem: 'Favor informar todos os campos' });
        }

        const peca = await PECA.create({ nome, quantidade });
        res.status(201).send({ mensagem: 'Peça cadastrada com sucesso!', peca });
    } catch (erro) {
        console.error('Erro ao cadastrar peça: ', erro);
        res.status(500).send({ mensagem: 'Erro interno ao processar sua solicitação' });
    }
};

const cadastrarCliente = async (req, res) => {
    try {
        const { nome, email, telefone, cpf } = req.body;
        if (!nome || !email || !telefone || !cpf) {
            return res.status(400).send({ mensagem: 'Favor informar todos os campos necessários' });
        }

        const cliente = await CLIENTE.create({ nome, email, telefone, cpf });
        res.status(201).send({ mensagem: 'Cliente cadastrado com sucesso!', cliente });
    } catch (erro) {
        console.error('Erro ao cadastrar cliente: ', erro);
        res.status(500).send({ mensagem: 'Erro interno ao processar sua solicitação' });
    }
};

const clientes = async (req, res) => {
    try {
        const listaCliente = await CLIENTE.findAll();
        res.status(200).send(listaCliente);
    } catch (erro) {
        console.error('Erro ao buscar clientes: ', erro);
        res.status(500).send({ mensagem: 'Erro ao buscar clientes' });
    }
};

const cliente = async (req, res) => {
    const { id } = req.params;
    try {
        const clienteEncontrado = await CLIENTE.findByPk(id);
        if (!clienteEncontrado) {
            return res.status(404).send({ mensagem: 'Cliente não encontrado' });
        }
        res.status(200).send(clienteEncontrado);
    } catch (erro) {
        console.error('Erro ao buscar cliente: ', erro);
        res.status(500).send({ mensagem: 'Erro ao buscar cliente' });
    }
};

const peca = async (req, res) => {
    const { id } = req.params;
    try {
        const pecaEncontrada = await PECA.findByPk(id);
        if (!pecaEncontrada) {
            return res.status(404).send({ mensagem: 'Peça não encontrada' });
        }
        res.status(200).send(pecaEncontrada);
    } catch (erro) {
        console.error('Erro ao buscar peça: ', erro);
        res.status(500).send({ mensagem: 'Erro ao buscar peça' });
    }
};

const pecas = async (req, res) => {
    try {
        const listaPecas = await PECA.findAll();
        res.status(200).send(listaPecas);
    } catch (erro) {
        console.error('Erro ao buscar peças: ', erro);
        res.status(500).send({ mensagem: 'Erro ao buscar peças' });
    }
};

const atualizarCliente = async (req, res) => {
    try {        
        const id = req.params.id;
        const { nome, email, telefone, cpf } = req.body;
        const atualizar = await CLIENTE.update({ nome, email, telefone, cpf }, { where: { id } });
        const clienteAtualizado = await CLIENTE.findByPk(id);
        res.status(200).send({ mensagem: "Cadastro de cliente atualizado", cliente: clienteAtualizado });
    } catch (erro) {
        console.error('Erro ao atualizar cliente: ', erro);
        res.status(500).send({ mensagem: 'Erro interno ao processar sua solicitação' });
    }
};

const apagarCliente = async (req, res) => {
    try {
        const id = req.params.id;
        const cliente = await CLIENTE.findOne({ where: { id } });
        if (!cliente) {
            return res.status(404).send({ mensagem: 'Cliente não encontrado' });
        }
        await CLIENTE.destroy({ where: { id } });
        res.status(200).send({ mensagem: 'Cadastro de cliente apagado com sucesso' });
    } catch (erro) {
        console.error('Erro ao apagar cliente: ', erro);
        res.status(500).send({ mensagem: 'Erro interno ao processar sua solicitação' });
    }
};

const atualizarPeca = async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, quantidade, marca, lote, tamanho, preco, preco_custo } = req.body;
        const atualizar = await PECA.update({ nome, quantidade, marca, lote, tamanho, preco, preco_custo }, { where: { id } });
        const pecaAtualizada = await PECA.findByPk(id);
        res.status(200).send({ mensagem: "Peça atualizada com sucesso", peca: pecaAtualizada });
    } catch (erro) {
        console.error('Erro ao atualizar peça: ', erro);
        res.status(500).send({ mensagem: 'Erro interno ao processar sua solicitação' });
    }
};

const apagarPeca = async (req, res) => {
    try {
        const id = req.params.id;
        const peca = await PECA.findOne({ where: { id } });
        if (!peca) {
            return res.status(404).send({ mensagem: 'Peça não encontrada' });
        }
        await PECA.destroy({ where: { id } });
        res.status(200).send({ mensagem: 'Peça apagada com sucesso' });
    } catch (erro) {
        console.error('Erro ao apagar peça: ', erro);
        res.status(500).send({ mensagem: 'Erro interno ao processar sua solicitação' });
    }
};

export {
    cadastrarPeca, cadastrarCliente, clientes, cliente, peca, pecas, atualizarCliente, apagarCliente, atualizarPeca, apagarPeca,
};
