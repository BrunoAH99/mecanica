import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'

export default function PecaDetalhes() {

    const { id } = useParams()
    const [peca, setPeca] = useState('')
    const [error, setError] = useState('')
    //const [relatorio, setRelatorio] = useState([])
    const [mensagem, setMensagem] = useState('')

    const carregarPeca = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/peca/${id}`)
            setPeca(response.data)
        } catch (error) {
            setError('Erro ao carregar peca');
            console.error('Erro ao carregar peca:', error.response || error)
        }
    }

    useEffect(() => {
        carregarPeca()
    //    carregarRelatorio()
    }, [id])

    const apagarPeca = async () => {
        const senhaConfirmacao = window.prompt("Digite a senha do administrador para confirmar a exclusão:")

        if (!senhaConfirmacao) {
            setMensagem('Exclusão cancelada. Senha não fornecida.')
            return
        }

        try {
            // Envia a requisição para apagar o funcionário com a senha do administrador
            const respostaExcluir = await axios.delete(`http://localhost:3000/apagar_peca/${id}`, {
                data: { senha: senhaConfirmacao } // A senha é enviada no corpo da requisição
            })
            setMensagem(respostaExcluir.data)
        } catch (error) {
            console.error("Erro ao excluir funcionário:", error)
            setMensagem('Erro ao excluir funcionário')
        }
    }

    //const carregarRelatorio = async () => {
    //    try {
    //        const response = await axios.get(`http://localhost:3000/listar_relatorios_peca/${id}`)
    //        setRelatorio(response.data)
    //        console.log(response.data)
    //    } catch (error) {
    //        setError('Erro ao carregar relatório')
    //        console.error('Erro ao carregar relatório:', error)
    //    }
    //}


    if (error) {
        return <p>{error}</p>
    }

    return (
        <>
            <div className="peca-detalhes-container">
                {peca ? (
                    <>
                        <p className="peca-detalhes-item">peca: {peca.nome}</p>
                        <p className="peca-detalhes-item">Quantidade em estoque: {peca.quantidade}</p>
                        <p className="peca-detalhes-item">ID: {peca.id}</p>
                    </>
                ) : (
                    <p className="peca-not-found">peca não encontrado.</p>
                )}
            </div>

            <div className="botoes-container">
                <Link to={`/atualizar_peca/${id}`}>
                    <button className="peca-form-button">Atualizar</button>
                </Link>
                <button type="button" onClick={apagarPeca} className="peca-form-button2">Excluir</button>
            </div>

          
        </>
    )
}
