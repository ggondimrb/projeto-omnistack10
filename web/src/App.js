import React, { useState, useEffect } from 'react';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import api from './services/Api.js';

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

// COMPONENTE: Funcao que retorna algum conteudo html,css ou javascript. bloco isolado de html, css ou js que nao interfere
// no restante da aplicacao
// PROPRIEDADE: Informacoes que um componente pai passa para o componente filho 
// ESTADO: Informaçoes mantidas pelo componente (Lembrar: imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);


  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
},[]);

  async function handleAddDev(data) {    

    const response = await api.post('/devs', data)   

    setDevs([...devs, response.data]); // adicionando o novo registro no array
    
  }


  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}                    
        </ul>
      </main>
    </div>    
  );
}

export default App;
