import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import './index.css'

import {AtualizarPeca} from '../src/AtualizarPeca'
import {CadastrarCliente} from '../src/CadastrarCliente'
import {CadastrarPeça} from '../src/CadastroPeca'
import {ClienteDetalhes} from '../src/Cliente'
import {Inicial} from '../src/Home'
import {Clientes} from '../src/ListaCliente'
import {Pecas} from '../src/ListaPeca'
import {PecaDetalhes} from '../src/Peca.jsx'
import {AtualizarCliente} from '../src/AtualizarCliente.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicial />
  },
  {
    path: "/peça/cadastro",
    element: <CadastrarPeça />
  },
  {
    path: "/cliente/cadastro", 
    element: <CadastrarCliente />,
  },
  {
    path: "/lista_clientes",
    element: <Clientes/>,
  },
  {
    path: "/cliente/:id",
    element: <ClienteDetalhes/>
  },
  {
    path: "/lista_peças",
    element: <Pecas/>
  },
  {
    path: "/peças/:id",
    element:<PecaDetalhes/>
  },
  {
    path: "/atualizar_cliente/:id",
    element: <AtualizarCliente/>
  },
  {
    path:"/atualizar_peça/:id",
    element: <AtualizarPeca/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
