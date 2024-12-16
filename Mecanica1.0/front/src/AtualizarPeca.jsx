import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';

export default function AtualizarPeca() {
    // Inicializando os estados corretamente
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [marca, setMarca] = useState('');
    const [lote, setLote] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [preco, setPreco] = useState('');
    const [precoCusto, setPrecoCusto] = useState('');
    const [mensagem, setMensagem] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    

    // Carregar dados da peça ao montar o componente
    useEffect(() => {
        const carregarPeca = async () => {
            try {
                const resposta = await axios.get(`http://localhost:3000/peça/${id}`);
                const peca = resposta.data;
                setNome(peca.nome);
                setQuantidade(peca.quantidade);
                setMarca(peca.marca);
                setLote(peca.lote);
                setTamanho(peca.tamanho);
                setPreco(peca.preco);
                setPrecoCusto(peca.preco_custo);
            } catch (error) {
                console.error("Erro ao carregar peça:", error);
                setMensagem('Erro ao carregar os dados da peça');
            }
        };

        carregarPeca();
    }, [id]);

    // Função para atualizar a peça
    const atualizarPeca = async (e) => {
        e.preventDefault();

        // Validação dos campos
        if (!nome || !quantidade || !marca || !lote || !tamanho || !preco || !precoCusto) {
            setMensagem('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const resposta = await axios.put(`http://localhost:3000/peça/atualizar/${id}`, {
                nome, quantidade, marca, lote, tamanho, preco, preco_custo: precoCusto
            });
            setMensagem(resposta.data.mensagem);

            // Redireciona após sucesso
            setTimeout(() => {
                navigate(`/peças/${id}`);
            }, 1500); // Delay para ver a mensagem de sucesso
        } catch (error) {
            console.error("Erro ao atualizar peça:", error);
            setMensagem('Erro ao atualizar peça');
        }
    };

    return (
        <div className="cadastrar-container">
            <h1>Atualizar cadastro de peça</h1>
            <form onSubmit={atualizarPeca} className="cadastrar-form">
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
                    <label>Preço de Custo:</label>
                    <input
                        type="number"
                        value={precoCusto}
                        name="preco_custo"
                        onChange={(e) => setPrecoCusto(e.target.value)}
                        required
                    />
                </div>
                <div className="cadastrar-buttons">
                    <button type="submit">Atualizar</button>
                </div>
            </form>

            {mensagem && <p className="cadastrar-message">{mensagem}</p>}
        </div>
    );
}
