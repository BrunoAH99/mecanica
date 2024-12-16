import React from 'react'
import { Link } from 'react-router-dom'

export default function Inicial() {
    return (
        <div className='inicial_tela'>
            <div className='inicial_cabecalho'>
                <h1 className='inicial_titulo'>Mecânica</h1>
                <div className='inicial_cabecalho_buttons'>
                    <Link to={`/cliente/cadastro`}>
                        <button className='inicial_cabecalho_bt' aria-label="Cadastrar Cliente">
                            Cadastrar Cliente
                        </button>
                    </Link>
                    <Link to={`/peça/cadastro`}>
                        <button className='inicial_cabecalho_bt' aria-label="Cadastrar Peça">
                            Cadastrar Peça
                        </button>
                    </Link>
                </div>
            </div>

            <div className='inicial_campo_lista'>
                <Link to={`/lista_clientes`}>
                    <button className='inical_bt_lista' aria-label="Ver Lista de Clientes">Clientes</button>
                </Link>
                <Link to={`/lista_peças`}>
                    <button className='inical_bt_lista' aria-label="Ver Lista de Peças">Peças</button>
                </Link>
            </div>
        </div>
    )
}
