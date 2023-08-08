import './App.css';
import React, { useState, useEffect } from 'react';

import axios from 'axios'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Modal from './componets/Modal';
import Home from './componets/Home';
import Dashboard from './componets/Dashboard';
import Post from './componets/Post';
import Hellow from './componets/Hellow';

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState('未ログイン');
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const handleLogin = (data) => {
    setLoggedInStatus("ログインなう")
    setUser(data.user)
  }
 // 追加
 const handleLogout = () => {
  setLoggedInStatus("未ログイン")
  setUser({})
}

  useEffect(() => {
    checkLoginStatus()
  })

  const checkLoginStatus = () => {
    axios.get("http://52.195.43.116:3000/logged_in", { withCredentials: true })

      .then(response => {
        if (response.data.logged_in && loggedInStatus === "未ログイン") {
          setLoggedInStatus("ログインなう")
          setUser(response.data.user)
        } else if (!response.data.logged_in && loggedInStatus === "ログインなう") {
          setLoggedInStatus("未ログイン")
          setUser({})
        }
      })

      .catch(error => {
        console.log("ログインエラー", error)
    })
}


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
        <Routes>
        <Route
            exact path={"/"}
            render={props => (
              <Home
              {...props}
              handleLogin={handleLogin}
              // 追加する
              handleLogout={handleLogout}
              loggedInStatus={loggedInStatus}
            />
            )}
          />
          
          <Route
            exact path={"/"}
            render={props => (
              <Dashboard { ...props } loggedInStatus={loggedInStatus} />
            )}
          />
          <Route exact path={'/posts/new'} component={Post} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
