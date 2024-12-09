import express from 'express'
import {
    cadastrarPeca, cadastrarCliente, clientes, cliente, peca, pecas, atualizarCliente, apagarCliente, 
    atualizarPeca, apagarPeca, 
} from '../controllers/controller.js'
const router = express.Router()
//Rotas peças
router.post('/peça/cadastro', cadastrarPeca)
router.get('/peça/lista_peça', pecas)
router.get('/peça/:id', peca)
router.put('/peça/atualizar/:id', atualizarPeca)
router.delete('peça/deletar/:id', apagarPeca)

//Rotas clientes
router.post('/cliente/cadastro', cadastrarCliente)
router.get('/cliente/lista_cliente', clientes)
router.get('/cliente/:id', cliente)
router.put('cliente/atualizar/:id', atualizarCliente)
router.delete('cliente/deletar/:id', apagarCliente)

//Rotas relatório

export default router

