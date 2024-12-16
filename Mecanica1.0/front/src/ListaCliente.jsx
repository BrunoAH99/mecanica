import React, { useEffect, useState, useCallback, useMemo } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Função para carregar os clientes
  const carregarCliente = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/clientes')
      setClientes(Object.values(response.data))
      setLoading(false)
    } catch (erro) {
      console.error('Erro ao carregar os dados dos clientes', erro) // Logar o erro no console para depuração
      setError('Erro ao carregar os dados dos clientes')
      setLoading(false)
    }
  }, [])

  // Carrega os dados apenas uma vez
  useEffect(() => {
    carregarCliente()
  }, [carregarCliente])

  // Atualiza o termo de pesquisa
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  // Filtra os clientes com base no nome e no termo de pesquisa
  const filteredClientes = useMemo(() => 
    clientes.filter((cliente) =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
    ), [clientes, searchTerm])

  return (
    <div className="funcionario-list-container">
      <div>
        <input
          className='barra-pesquisa'
          type="text"
          placeholder="Pesquisar cliente pelo nome:"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {loading && <p>Carregando os clientes...</p>}

      {error && <p>{error}</p>}

      {filteredClientes.length > 0 && !loading ? (
        filteredClientes.map((cliente) => (
          <Link to={`/cliente/${cliente.id}`} key={cliente.id} className="funcionario-item">
            <img className="icone" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user-icon" />
            <p>Nome: {cliente.nome}</p>
            <p>Setor: {cliente.setor}</p>
          </Link>
        ))
      ) : (
        !loading && <p>Nenhum cliente encontrado.</p>
      )}
    </div>
  )
}
