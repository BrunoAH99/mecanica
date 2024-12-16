import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function ClienteDetalhes() {
    const { id } = useParams();
    const [cliente, setCliente] = useState(null);  // Inicializar como null
    const [error, setError] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [isLoading, setIsLoading] = useState(true);  // Estado para indicar carregamento

    // Função para carregar dados do cliente
    const carregarCliente = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/cliente/${id}`);
            setCliente(response.data);
        } catch (error) {
            setError('Erro ao carregar cliente');
            console.error('Erro ao carregar cliente:', error.response || error);
        } finally {
            setIsLoading(false);  // Finaliza o carregamento
        }
    };

    // Função para apagar cliente com confirmação
    const apagarCliente = async () => {
        const confirmacao = window.confirm('Tem certeza que deseja excluir este cliente?');
        if (!confirmacao) return; // Se o usuário cancelar, não prossegue com a exclusão

        try {
            const respostaExcluir = await axios.delete(`http://localhost:3000/cliente/deletar/${id}`);
            setMensagem(respostaExcluir.data.mensagem);
        } catch (error) {
            setMensagem('Erro ao excluir cliente');
            console.error('Erro ao excluir cliente:', error);
        }
    };

    useEffect(() => {
        carregarCliente();
    }, [id]);

    if (isLoading) {
        return <p>Carregando dados do cliente...</p>;  // Exibição de estado de carregamento
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="cliente-detalhes-container">
            {cliente ? (
                <>
                    <ul className="cliente-detalhes-list">
                        <img
                            className='icone2'
                            src={cliente.imagem || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} // Usar imagem do cliente se houver
                            alt="Ícone do cliente"
                        />
                        <li className="cliente-detalhes-item">Nome: {cliente.nome}</li>
                        <li className="cliente-detalhes-item">Setor: {cliente.setor}</li>
                        <li className="cliente-detalhes-item">Email: {cliente.email}</li>
                        <li className="cliente-detalhes-item">Telefone: {cliente.telefone}</li>
                        <li className="cliente-detalhes-item">Matrícula: {cliente.id}</li>
                    </ul>

                    <div className="botoes-container">
                        <Link to={`/atualizar_cliente/${id}`}>
                            <button className="cliente-form-button">Atualizar</button>
                        </Link>
                        <Link to={`/registro`}>
                            <button className="cliente-form-button3">Registro</button>
                        </Link>
                        <button className="cliente-form-button2" type="button" onClick={apagarCliente}>
                            Excluir
                        </button>
                    </div>
                </>
            ) : (
                <p className="cliente-not-found">Cliente não encontrado.</p>
            )}

            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}
