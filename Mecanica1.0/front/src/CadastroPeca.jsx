import React, { useState } from 'react';
import axios from 'axios';

export default function CadastrarPeca() {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [marca, setMarca] = useState('');
    const [lote, setLote] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [preco, setPreco] = useState('');
    const [precoCusto, setPrecoCusto] = useState('');
    const [mensagem, setMensagem] = useState('');

    // Função para resetar os campos
    const resetCampos = () => {
        setNome('');
        setQuantidade('');
        setMarca('');
        setLote('');
        setTamanho('');
        setPreco('');
        setPrecoCusto('');
    };

    // Validação dos campos antes de enviar os dados
    const validarCampos = () => {
        if (!nome || !quantidade || !marca || !lote || !tamanho || !preco || !precoCusto) {
            setMensagem('Por favor, preencha todos os campos.');
            return false;
        }

        if (quantidade <= 0) {
            setMensagem('Quantidade deve ser maior que 0.');
            return false;
        }

        if (preco <= 0 || precoCusto <= 0) {
            setMensagem('Os preços devem ser valores positivos.');
            return false;
        }

        return true;
    };

    const cadastro_peca = async (e) => {
        e.preventDefault();

        // Validar antes de enviar
        if (!validarCampos()) {
            return;
        }

        try {
            const resposta = await axios.post('http://localhost:3000/peça/cadastro', {
                nome, quantidade, marca, lote, tamanho, preco, preco_custo: precoCusto
            });
            setMensagem(resposta.data.mensagem);
            resetCampos(); // Limpar os campos após o cadastro bem-sucedido
        } catch (error) {
            console.error("Erro ao cadastrar peça:", error);
            setMensagem(error.response?.data?.mensagem || 'Erro ao cadastrar peça');
        }
    };

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
                <div>
                    <label>Marca:</label>
                    <input
                        type="text"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Lote:</label>
                    <input
                        type="text"
                        value={lote}
                        onChange={(e) => setLote(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Tamanho:</label>
                    <input
                        type="text"
                        value={tamanho}
                        onChange={(e) => setTamanho(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Preço Custo:</label>
                    <input
                        type="number"
                        value={precoCusto}
                        onChange={(e) => setPrecoCusto(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Preço:</label>
                    <input
                        type="number"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        required
                    />
                </div>
                <div className="cadastrar-buttons">
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
            {mensagem && <p className="cadastrar-message">{mensagem}</p>}
        </div>
    );
}
