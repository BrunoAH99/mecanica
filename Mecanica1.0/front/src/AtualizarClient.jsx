import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function AtualizarCliente() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [mensagem, setMensagem] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();  

    // Carregar dados do cliente ao montar o componente
    useEffect(() => {
        const carregarCliente = async () => {
            try {
                const resposta = await axios.get(`http://localhost:3000/cliente/${id}`);
                const cliente = resposta.data;
                setNome(cliente.nome);
                setEmail(cliente.email);
                setTelefone(cliente.telefone);
                setCpf(cliente.cpf);
            } catch (error) {
                console.error("Erro ao carregar cliente:", error);
                setMensagem('Erro ao carregar os dados do cliente');
            }
        };

        carregarCliente();
    }, [id]);

    // Atualizar cliente
    const atualizar_cliente = async (e) => {
        e.preventDefault();

        // Validação básica
        if (!nome || !email || !telefone || !cpf) {
            setMensagem('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const resposta = await axios.put(`http://localhost:3000/cliente/atualizar/${id}`, {
                nome, email, telefone, cpf
            });
            setMensagem(resposta.data.mensagem);
            // Redirecionar para a página de detalhes do cliente ou outra página após sucesso
            setTimeout(() => {
                navigate(`/cliente/${id}`);
            }, 1500);
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
