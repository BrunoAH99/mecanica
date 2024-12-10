import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import './index.css'
import { CLIENTE } from '../../back/models/CLIENTE'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/peça/cadastro",
    element: <CadastrarPeca />
  },
  {
    path: "/cliente/cadastro", 
    element: <CadastrarCliente />,
  },
  {
    path: "/lista_clientes",
    element: <CLIENTE/>,
  },
  {
    path: "/cliente/:id",
    element: <Funcionario/>
  },
  {
    path: "/registro",
    element: <Registro/>,
  },{
    path: "/lista_peças",
    element: <EPIs/>
  },{
    path: "/peças/:id",
    element:<EpiDetalhes/>
  },{
    path: "/atualizar_cliente/:id",
    element: <AtualizarFuncionario/>
  },{
    path:"/atualizar_peça/:id",
    element: <AtualizarEPI/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
