import React, { useEffect, useState } from 'react';
import './global.css';
import './App.css';
import './Aside.css';
import './Main.css';
import api from './services/api';

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [github_username, setGithub_username] = useState('');
  const [techs, setTechs] = useState('');
  const [devs, setdevs] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        //console.log(position);
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 3000
      }
    );
  }, []);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setdevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();

    const response = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude
    });
    //console.log(response.data);

    setGithub_username('');
    setTechs('');
    setdevs([...devs, response.data]);
  }

  return (
    <div id='app'>
      <aside>
        <strong>Cadastro</strong>
        <form onSubmit={handleAddDev}>
          <div className='input-block'>
            <label htmlFor='github_username'>Usuário</label>
            <input name='github_username' id='github_username' value={github_username} required onChange={e => setGithub_username(e.target.value)} />
          </div>

          <div className='input-block'>
            <label htmlFor='techs'>Tecnologias</label>
            <input name='techs' id='techs' value={techs} required onChange={e => setTechs(e.target.value)} />
          </div>

          <div className='input-group'>
            <div className='input-block'>
              <label htmlFor='latitude'>Latitude</label>
              <input type='number' name='latitude' id='latitude' required value={latitude} onChange={e => setLatitude(e.target.value)} />
            </div>

            <div className='input-block'>
              <label htmlFor='longitude'>Longitude</label>
              <input type='number' name='longitude' id='longitude' required value={longitude} onChange={e => setLongitude(e.target.value)} />
            </div>
          </div>
          <button type='submit'>Salvar</button>
        </form>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <li className='dev-item' key={dev._id}>
              <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className='user-info'>
                  <strong>{dev.name}</strong>
                  <span> {dev.bio}</span>
                </div>
              </header>
              <p> {dev.techs.join(', ')}</p>
              <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
