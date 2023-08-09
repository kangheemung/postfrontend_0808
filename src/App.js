import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, useLocation  } from 'react-router-dom';
import Modal from './components/Modal';
import Header from './components/Header';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Post from './components/Post';
import Hellow from './components/Hellow';
import SignIn from './components/railsuser/SignIn';
import './App.css';

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState('未ログイン');
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleLogin = (data) => {
    setLoggedInStatus("ログインなう");
    setUser({ user: data.user });
  };
  
  const handleLogout = () => {
    setLoggedInStatus("未ログイン");
    setUser({});
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get("http://52.195.43.116:3000/logged_in", { withCredentials: true });
      if (response.data.logged_in && loggedInStatus === "未ログイン") {
        setLoggedInStatus("ログインなう");
        setUser(response.data.user);
      } else if (!response.data.logged_in && loggedInStatus === "ログインなう") {
        setLoggedInStatus("未ログイン");
        setUser({});
      }
    } catch (error) {
      console.log("ログインエラー", error);
    }
  };

  function toggleModalHandler() {
    setShowModal((isShowing) => !isShowing);
  }

  return (
    <BrowserRouter>
    <main>
      <Header/>
      <h1>ここはAPPの場所</h1>
      <Hellow />
      <Post onContact={toggleModalHandler} />
      {showModal && <Modal onClose={toggleModalHandler} />}
     
        <Routes>
          <Route
            exact path={"/"}
            element={<Home
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              loggedInStatus={loggedInStatus}
            />}
          />
          <Route
            exact path={"/dashboard"}
            element={<Dashboard loggedInStatus={loggedInStatus} />}
          />
          <Route
            path="/users/new"
            element={<SignIn />}
          />
          <Route
            exact path={'/posts/new'}
            element={<Post />}
          />
        </Routes>
      
    </main>
    </BrowserRouter>
  );
}

export default App;
