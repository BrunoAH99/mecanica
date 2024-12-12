import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function AtualizarPeca() {
    const [nome, setNome] = useState({nome})
    const [quantidade, setQuantidade] = useState({quantidade})
    const [marca, setMarca] = useState({marca})
    const [lote, setLote] = useState({lote})
    const [tamanho, setTamanho] = useState({tamanho})
    const [preco, setPreco] = useState({preco})
    const [preco_custo, setPreco_custo] = useState({preco_custo})
    const [mensagem, setMensagem] = useState('')    
    const { id } = useParams()

    const atualizar_peca = async (e) => {
        e.preventDefault() 

        if (!nome || !quantidade || !marca || !lote || !tamanho || !preco || !preco_custo) {
            setMensagem('Por favor, preencha todos os campos.')
            return
        }

        try {
            const resposta = await axios.put(`http://localhost:3000/peça/atualizar/${id}`, {
                nome, quantidade, marca, lote, tamanho, preco, preco_custo
            })
            setMensagem(resposta.data.mensagem)
        } catch (error) {
            console.error("Erro ao atualizar peça:", error)
            setMensagem('Erro ao atualizar peça')
        }
    }
//nome, quantidade, marca, lote, tamanho, preco, preco_custo
    return (
        <div className="cadastrar-container">
            <h1>Atualizar cadastro de peça</h1>
            <form onSubmit={atualizar_peca} className="cadastrar-form">
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        name="nome"
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Quantidade:</label>
                    <input
                        type="number"
                        name="quantidade"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Marca:</label>
                    <input
                        type="text"
                        value={marca}
                        name="marca"
                        onChange={(e) => setMarca(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Lote:</label>
                    <input
                        type="text"
                        value={lote}
                        name="lote"
                        onChange={(e) => setLote(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Tamanho:</label>
                    <input
                        type="text"
                        value={tamanho}
                        name="tamanho"
                        onChange={(e) => setTamanho(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Preço:</label>
                    <input
                        type="number"
                        value={preco}
                        name="preco"
                        onChange={(e) => setPreco(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Preço de custo:</label>
                    <input
                        type="number"
                        value={preco_custo}
                        name="preco_custo"
                        onChange={(e) => setPreco_custo(e.target.value)}
                        required
                    />
                </div>
                <div className="cadastrar-buttons">
                    <button type="submit">Atualizar</button>
                </div>
            </form>
            {mensagem && <p className="cadastrar-message">{mensagem}</p>}
        </div>
    )
}
