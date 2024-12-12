import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const carregarCliente = async () => {
    try {
      const response = await axios.get('http://localhost:3000/clientes')
      setClientes(Object.values(response.data))
      setLoading(false)
    } catch (erro) {
      console.error('Erro ao carregar os dados dos funcionários', erro) // Logar o erro no console para depuração
      setError('Erro ao carregar os dados dos funcionários')
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarCliente()
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredClientes = clientes.filter((funcionario) =>
    funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="funcionario-list-container">
      <div>
        <input className='barra-pesquisa'
          type="text"
          placeholder="Pesquisar funcionário pelo nome:"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {loading && <p>Carregando os funcionários...</p>}

      {error && <p>{error}</p>}

      {filteredClientes.length > 0 && !loading ? (
        filteredClientes.map((listaClientes) => (
          <Link to={`/cliente/${listaClientes.id}`} key={listaClientes.id} className="funcionario-item">
            <img className="icone" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user-icon" />
            <p>Nome: {listaClientes.nome}</p>
            <p>Setor: {listaClientes.setor}</p>
          </Link>
        ))
      ) : (
        !loading && <p>Nenhum funcionário encontrado.</p>
      )}
    </div>
  )
}