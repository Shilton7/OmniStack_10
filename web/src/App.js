import React, { useEffect, useState } from 'react';
import './global.css';
import './App.css';
import './Aside.css';
import './Main.css';
import api from './services/api';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

function App() {
  const [devs, setdevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setdevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);
    setdevs([...devs, response.data]);
  }

  return (
    <div id='app'>
      <aside>
        <strong>Cadastro</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>{devs.length > 0 ? devs.map(dev => <DevItem key={dev._id} dev={dev} />) : 'Nenhum Dev Cadastrado!'}</ul>
      </main>
    </div>
  );
}

export default App;
