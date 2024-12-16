import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function PecaDetalhes() {
    const { id } = useParams();
    const [peca, setPeca] = useState(null);
    const [error, setError] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [loading, setLoading] = useState(true);

    // Carregar dados da peça
    const carregarPeca = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/peca/${id}`);
            setPeca(response.data);
            setLoading(false);
        } catch (error) {
            setError('Erro ao carregar a peça');
            setLoading(false);
            console.error('Erro ao carregar peça:', error.response || error);
        }
    };

    // Executar a exclusão da peça
    const apagarPeca = async () => {
        const senhaConfirmacao = window.prompt("Digite a senha do administrador para confirmar a exclusão:");

        if (!senhaConfirmacao) {
            setMensagem('Exclusão cancelada. Senha não fornecida.');
            return;
        }

        try {
            const respostaExcluir = await axios.delete(`http://localhost:3000/apagar_peca/${id}`, {
                data: { senha: senhaConfirmacao }
            });
            setMensagem(respostaExcluir.data);
        } catch (error) {
            setMensagem('Erro ao excluir peça.');
            console.error("Erro ao excluir peça:", error);
        }
    };

    useEffect(() => {
        carregarPeca();
    }, [id]);

    // Feedback visual durante o carregamento
    if (loading) {
        return <p>Carregando dados da peça...</p>;
    }

    // Exibir erro, se houver
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <div className="peca-detalhes-container">
                {peca ? (
                    <>
                        <p className="peca-detalhes-item">Peça: {peca.nome}</p>
                        <p className="peca-detalhes-item">Quantidade em estoque: {peca.quantidade}</p>
                        <p className="peca-detalhes-item">ID: {peca.id}</p>
                    </>
                ) : (
                    <p className="peca-not-found">Peça não encontrada.</p>
                )}
            </div>

            <div className="botoes-container">
                <Link to={`/atualizar_peca/${id}`}>
                    <button className="peca-form-button">Atualizar</button>
                </Link>
                <button type="button" onClick={apagarPeca} className="peca-form-button2">Excluir</button>
            </div>

            {/* Exibe mensagem de erro ou sucesso */}
            {mensagem && <p className="peca-mensagem">{mensagem}</p>}
        </>
    );
}
