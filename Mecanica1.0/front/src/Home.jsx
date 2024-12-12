import React from 'react'
import { Link } from 'react-router-dom'

export default function Inicial() {


    return (
        <div className='inicial_tela'>
            <img className='imagem_inicial' src='https://cdn-icons-png.flaticon.com/512/2750/2750861.png'></img>
            <div className='inicial_cabecalho'>
                <h1 className='inicial_titulo'>Mecanica</h1>
                <div>
                    <Link to={`/cliente/cadastro`}  >
                        <button className='inicial_cabecalho_bt'>
                            Cadastrar Cliente
                        </button>
                    </Link>
                    <Link to={`/peça/cadastro`}  >
                        <button className='inicial_cabecalho_bt'>
                            Cadastrar peça
                        </button>
                    </Link>
                </div>
            </div>
            <div className='inicial_campo_lista'>
                <Link to={`/lista_clientes`}  >
                    <button className='inical_bt_lista'> Clientes </button>
                </Link>
                <Link to={`/lista_peças`} >
                    <button className='inical_bt_lista'> Peças</button>
                </Link>
            </div>
        </div>
    )
}
