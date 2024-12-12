import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Pecas() {
  const [pecas, setPecas] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const carregarPecas = async () => {
    const response = await axios.get(`http://localhost:3000/peca`)
    setPecas(Object.values(response.data))
    console.log(response.data)
  }

  useEffect(() => {
    carregarPecas()
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredPecas = pecas.filter((peca) =>
    peca.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="lista-list-container">
      <div>
        <input className='barra-pesquisa'
          type="text"
          placeholder="Pesquisar por peça:"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {filteredPecas.length > 0 ? (
        filteredPecas.map((listaPecas, key) => (
          <div key={key} className="lista-item">
            <Link to={`/pecas/${listaPecas.id}`} className="lista-link">
              <p>peca: {listaPecas.nome}</p>
              <p>Quantidade: {listaPecas.quantidade}</p>
            </Link>
          </div>
        ))
      ) : (
        <p>Nenhum peca encontrado.</p>
      )}
    </div>
  )
}