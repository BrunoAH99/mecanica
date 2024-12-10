import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function AtualizarFuncionario() {
    const [nome, setNome] = useState({nome})
    const [email, setEmail] = useState({email})
    const [telefone, setTelefone] = useState({telefone})
    const [cpf, setCpf] = useState({cpf})
    const [mensagem, setMensagem] = useState('')
    const { id } = useParams()


    const atualizar_funcionario = async () => {
        try {
            const resposta = await axios.put(`http://localhost:3000/cliente/atualizar/${id}`, {
                nome, setor, telefone, email
            })
            setMensagem(resposta.data.mensagem)
        } catch (error) {
            console.error("Erro ao atualizar funcionario:", error)
            setMensagem('Erro ao atualizar funcionario')
        }
    }

    return (
        <div className="cadastrar-container">
            <h1>Atualizar cadastro do funcionário</h1>
            <form className="cadastrar-form">
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input
                        type="number"
                        value={telefone}
                        name="fone"
                        onChange={(e) => setTelefone(e.target.value)}
                        required />
                </div>
                <div>
                    <label>CPF:</label>
                    <input
                        type="text"
                        value={cpf}
                        name="cpf"
                        onChange={(e) => setCpf(e.target.value)}
                        required />
                </div>
                <div className="cadastrar-buttons">
                    <button type="submit" onClick={atualizar_funcionario}>Atualizar</button>
                </div>
            </form>

            {mensagem && <p className="cadastrar-message">{mensagem}</p>}
        </div>
    );
}
