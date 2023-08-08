import './App.css';

import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Modal from './componets/Modal';
import Home from './componets/Home';
import Dashboard from './componets/Dashboard';
import Post from './componets/Post';
import Hellow from './componets/Hellow';

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState('未ログイン');
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);

  function toggleModalHandler() {
    setShowModal((isShowing) => !isShowing);
  }

  return (
    <main>
      <h1>ここはAPPの場所</h1>
      <Hellow />
      <Post onContact={toggleModalHandler} />
      {showModal && <Modal onClose={toggleModalHandler} />}
      <BrowserRouter>
        <Switch>
        <Route
            exact path={"/"}
            render={props => (
              <Home { ...props } loggedInStatus={loggedInStatus} />
            )}
          />
          
          <Route
            exact path={"/"}
            render={props => (
              <Dashboard { ...props } loggedInStatus={loggedInStatus} />
            )}
          />
          <Route exact path={'/posts/new'} component={Post} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
