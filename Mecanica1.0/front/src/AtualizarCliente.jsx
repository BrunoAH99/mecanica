// AtualizarCliente.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function AtualizarCliente() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [mensagem, setMensagem] = useState('');
    const { id } = useParams();

    const atualizar_cliente = async (e) => {
        e.preventDefault();
        try {
            const resposta = await axios.put(`http://localhost:3000/cliente/atualizar/${id}`, {
                nome, email, telefone, cpf
            });
            setMensagem(resposta.data.mensagem);
        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
            setMensagem('Erro ao atualizar cliente');
        }
    };

    return (
        <div className="cadastrar-container">
            <h1>Atualizar Cliente</h1>
            <form className="cadastrar-form" onSubmit={atualizar_cliente}>
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
                        type="email"
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input
                        type="text"
                        value={telefone}
                        name="telefone"
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
                    <button type="submit">Atualizar</button>
                </div>
            </form>

            {mensagem && <p className="cadastrar-message">{mensagem}</p>}
        </div>
    );
}
