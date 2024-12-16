import React, { useState } from 'react';
import axios from 'axios';

export default function CadastrarCliente() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [mensagem, setMensagem] = useState('');

    // Função para resetar os campos
    const resetCampos = () => {
        setNome('');
        setEmail('');
        setTelefone('');
        setCpf('');
    };

    const cadastro_cliente = async (e) => {
        e.preventDefault();

        // Validação de campos
        if (!nome || !email || !telefone || !cpf) {
            setMensagem('Por favor, preencha todos os campos!');
            return;
        }

        try {
            const resposta = await axios.post('http://localhost:3000/cliente/cadastro', {
                nome, email, telefone, cpf
            });
            setMensagem(resposta.data.mensagem);
            resetCampos(); // Limpa os campos após cadastro bem-sucedido
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            setMensagem(error.response?.data?.mensagem || 'Erro ao cadastrar cliente');
        }
    };

    return (
        <div className="cadastrar-container">
            <h1>Cadastrar cliente</h1>
            <form onSubmit={cadastro_cliente} className="cadastrar-form">
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
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        name="email"
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input 
                        type="text"  // Mudança para text
                        value={telefone} 
                        name="telefone"
                        onChange={(e) => setTelefone(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>CPF:</label>
                    <input 
                        type="text"  // Mudança para text
                        value={cpf} 
                        name="cpf"
                        onChange={(e) => setCpf(e.target.value)} 
                        required 
                    />
                </div>
                <div className="cadastrar-buttons">
                    <button type="submit">Cadastrar</button>
                </div>
                {mensagem && <p className="cadastrar-message">{mensagem}</p>}
            </form>
        </div>
    );
}
