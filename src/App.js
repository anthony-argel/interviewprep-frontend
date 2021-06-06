import NavBar from './components/navbar';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Search from './components/search';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
function App() {
  const [apiURL, setAPIURL] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
     setAPIURL('http://localhost:6969');
     verifyToken();
  }, [])

  const verifyToken = () => {
    if(localStorage.getItem('token') === null) return;
    if(apiURL === '') return;


    fetch(apiURL + '/user/verify', {
      method:'GET',
      mode:'cors',
      headers: {'Content-Type': 'application/json',
      'authorization':'Bearer ' + localStorage.getItem('token')}
    }).then(res => {
      if(res.status === 200) {
        setLoggedIn(true);
      }
      else {
        setLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('id');
      }
    })
  }

  useEffect(() => {
    if(apiURL !== '') verifyToken();
  },[apiURL])

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <Switch>
          <Route path='/' exact><Home/></Route>
          <Route path='/login' exact><Login apiURL={apiURL} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/></Route>
          <Route path='/signup' exact><Signup apiURL={apiURL}/></Route>
          <Route path='/search/:query/:page' exact><Search apiURL={apiURL} /></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
