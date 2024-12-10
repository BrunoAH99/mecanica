import React, { useState } from 'react'
import axios from 'axios'

export default function CadastrarCliente() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cpf, setCpf] = useState('')
    const [mensagem, setMensagem] = useState('')

    const cadastro_cliente = async (e) => {
        e.preventDefault()

        try {
            const resposta = await axios.post('http://localhost:3000/cliente/cadastro', {
                nome, senha, email, cpf
            })
            setMensagem(resposta.data.mensagem)
            // Limpar os campos após o cadastro
            setNome('')
            setEmail('')
            setTelefone('')
            setCpf
        } catch (error) {
            setMensagem('Erro ao cadastrar cliente')
        }
    }       

    return (
        <div className="cadastrar-container">
            <h1>Cadastrar cliente</h1>
            <form onSubmit={cadastro_cliente} className="cadastrar-form">
                <div>
                    <label>Nome:</label>
                    <input 
                        type="text" 
                        value={nome} 
                        name='nome'
                        onChange={(e) => setNome(e.target.value)} 
                        required />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="text" 
                        value={email} 
                        name='email'
                        onChange={(e) => setEmail(e.target.value)} 
                        required />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input 
                        type="number" 
                        value={telefone} 
                        name='fone'
                        onChange={(e) => setTelefone(e.target.value)} 
                        required />
                </div>
                <div>
                    <label>CPF:</label>
                    <input 
                        type="number" 
                        value={cpf} 
                        name='cpf'
                        onChange={(e) => setCpf(e.target.value)} 
                        required />
                </div>
                <div className="cadastrar-buttons">
                    <button name='cadastrar'>Cadastrar</button>
                </div>
                {mensagem && <p className="cadastrar-message">{mensagem}</p>}
            </form>

        </div>
    )
}
