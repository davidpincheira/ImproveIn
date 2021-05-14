import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

function Test() {
  const [name, setName] = useState('');
  const obtenerData = async() => {      
    const item = await fetch(`https://my-json-server.typicode.com/improvein/dev-challenge/bands`)
    const band = await item.json()
    
    setData(band)
  }
  const [data, setData] = useState([])

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = data.filter((item) => {
        return item.name.toLowerCase().startsWith(keyword.toLowerCase());
      });      
      setData(results);      
    } else {
      obtenerData()
    }
    setName(keyword);
  };

  useEffect(() => {
    obtenerData()
  }, [])

  return (
    <div className="results-wrapper">
      <input
        type="search"
        value={name}
        onChange={filter}
        className="input"
        placeholder="Filter"
      />

      <div className='results'>
        <ul>{
            data.map(sorted => (
            <li key={sorted.id}>
                <p>{sorted.name} {sorted.genreCode}
                <Link to={`/bands/${sorted.id}`}><p>Ver Detalles</p></Link></p>                
            </li>
            ))
        }
        </ul>
      </div>
    </div>
  );
}

export default Test;