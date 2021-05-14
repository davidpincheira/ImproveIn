import React from 'react';
import { BrowserRouter, Route, Switch, Link, useHistory  } from 'react-router-dom';
import Bands from './Components/Song/Bands'
import DetailSong from './Components/Song/DetailSong'
import Home from './Home'
import Login from './Components/Login/Login'
import useToken from './Components/App/useToken';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  const eventClick = () => {
    localStorage.removeItem( 'token' );    
  }

  return (
    <div className="App">
      <h1>Application</h1>
    
      <BrowserRouter>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/bands">Band</Link></li>
            <li><Link to="/logout" onClick={ eventClick }  >Log out</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/bands/:id">
            <DetailSong />
          </Route>
        </Switch>
        <Route exact path='/bands' component={Bands}>
            <Bands />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;