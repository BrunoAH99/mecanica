import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

export default function ClienteDetalhes() {

    const { id } = useParams()
    const [cliente, setCliente] = useState('')
    const [error, setError] = useState('')
    //const [relatorio, setRelatorio] = useState([])
    const [mensagem, setMensagem] = useState('')

    const carregarCliente = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/cliente/${id}`)
            setCliente(response.data)
        } catch (error) {
            setError('Erro ao carregar cliente')
            console.error('Erro ao carregar cliente:', error.response || error)
        }
    }

    //*const carregarRelatorio = async () => {
    //    try {
    //       const response = await axios.get(`http://localhost:3000/listar_relatorios_cliente/${id}`)
    //        setRelatorio(response.data)
    //    } catch (error) {
    //        setError('Erro ao carregar relatório')
    //        console.error('Erro ao carregar relatório:', error)
    //    }
    //}

    const apagarCliente = async () => {

        try {

            const respostaExcluir = await axios.delete(`http://localhost:3000/cliente/deletar/${id}`)
            setMensagem(respostaExcluir.data.mensagem)

        } catch (error) {

            setMensagem('Erro ao excluir cliente')
            console.error('Erro ao excluir cliente:', error)

        }
    }

    useEffect(() => {
        const carregarDados = async () => {
            try {
                await carregarCliente()
            } catch (error) {
                setError('Erro ao carregar dados do cliente ou relatórios.')
                console.error(error)
            }
        }
        carregarDados()
        //carregarRelatorio()
    }, [id])

    if (error) {
        return <p>{error}</p>
    }

    return (
        <>
            <div className="cliente-detalhes-container">
                {cliente ? (
                    <ul className="cliente-detalhes-list">
                        <img className='icone2' src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user-icon"></img>
                        <li className="cliente-detalhes-item">Nome: {cliente.nome}</li>
                        <li className="cliente-detalhes-item">Setor: {cliente.setor}</li>
                        <li className="cliente-detalhes-item">Email: {cliente.email}</li>
                        <li className="cliente-detalhes-item">Telefone: {cliente.telefone}</li>
                        <li className="cliente-detalhes-item">Matrícula: {cliente.id}</li>
                    </ul>
                ) : (
                    <p className="cliente-not-found">Funcionário não encontrado.</p>
                )}
                <div className="botoes-container">
                    <Link to={`/atualizar_cliente/${id}`}>
                        <button className="cliente-form-button">Atualizar</button>
                    </Link>
                    <Link to={`/registro`}>
                        <button className="cliente-form-button3">Registro</button>
                    </Link>
                    <button className="cliente-form-button2" type="button" onClick={apagarCliente}>Excluir</button>
                </div>
            </div>            

            {mensagem && <p>{mensagem}</p>}
        </>
    )
}
{
    //<div className="cliente-detalhes-container">
    //<h3>Relatório de Movimentação de EPIs</h3>
    //{relatorio.length > 0 ? (
    //    relatorio.map((item, index) => (
    //        <div key={index} className="cliente-detalhes-list">
    //            <p>Data: {item.data}</p>
    //            <p>Nome do EPI: {item.nomeEpi}</p>
    //            <p>Quantidade: {item.quantidade}</p>
    //            <p>Status: {item.statuss}</p>
    //        </div>
    //    ))
    //) : (
    //    <p>Nenhum relatório encontrado para este funcionário.</p>
    //)}
    //</div>//
}