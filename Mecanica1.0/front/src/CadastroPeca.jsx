import React, { useState } from 'react'
import axios from 'axios'

export default function CadastrarPeça() {
    const [nome, setNome] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [marca, setMarca] = useState('')
    const [lote, setLote] = useState('')
    const [tamanho, setTamanho] = useState('')
    const [preco, setPreco] = useState('')
    const [preco_custo, setPreco_custo] = useState('')
    const [mensagem, setMensagem] = useState('')

    const cadastro_peca = async (e) => {
        e.preventDefault();

        try {
            const resposta = await axios.post('http://localhost:3000/peça/cadastro', {
                nome, quantidade, marca, lote, tamanho, preco, preco_custo
            })
            setMensagem(resposta.data.mensagem)
            // Limpar os campos após o cadastro
            setNome('')
            setQuantidade('')
            setMarca('')
            setLote('')
            setTamanho('')
            setPreco('')
            setPreco_custo('')
        } catch (error) {
            console.error("Erro ao cadastrar peça:", error)
            setMensagem('Erro ao cadastrar peça')
        }
    }   

    return (
        <div className="cadastrar-container">
            <h1>Cadastrar peça</h1>
            <form onSubmit={cadastro_peca} className="cadastrar-form">
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Quantidade:</label>
                    <input
                        type="number"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        required
                    />
                </div>

                <div className="cadastrar-buttons">
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
            {mensagem && <p className="cadastrar-message">{mensagem}</p>}
        </div>
    )
}
