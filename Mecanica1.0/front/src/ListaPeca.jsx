import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Pecas() {
  const [pecas, setPecas] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Função para carregar as peças
  const carregarPecas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/peca')
      setPecas(Object.values(response.data))
      setLoading(false)
    } catch (err) {
      setError('Erro ao carregar as peças')
      setLoading(false)
      console.error(err)
    }
  }

  // Chama a função para carregar as peças quando o componente for montado
  useEffect(() => {
    carregarPecas()
  }, [])

  // Função para atualizar o termo de pesquisa
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  // Filtrando as peças de forma eficiente
  const filteredPecas = useMemo(() => 
    pecas.filter((peca) => 
      peca.nome.toLowerCase().includes(searchTerm.toLowerCase())
    ), [pecas, searchTerm])

  return (
    <div className="lista-list-container">
      <div>
        <input 
          className='barra-pesquisa'
          type="text"
          placeholder="Pesquisar por peça:"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {loading && <p>Carregando as peças...</p>}

      {error && <p>{error}</p>}

      {filteredPecas.length > 0 ? (
        filteredPecas.map((listaPecas) => (
          <div key={listaPecas.id} className="lista-item">
            <Link to={`/pecas/${listaPecas.id}`} className="lista-link">
              <p>Peça: {listaPecas.nome}</p>
              <p>Quantidade: {listaPecas.quantidade}</p>
            </Link>
          </div>
        ))
      ) : (
        !loading && <p>Nenhuma peça encontrada.</p>
      )}
    </div>
  )
}
