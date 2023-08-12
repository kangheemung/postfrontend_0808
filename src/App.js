import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Modal from './components/Modal';
import Header from './components/Header';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Post from './components/Post';
import Hellow from './components/Hellow';
import SignIn from './components/railsuser/SignIn';
import Login from './components/railsuser/Login';
import Mypage from './components/Mypage';
import './App.css';

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState('未ログイン');
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleLogin = (data) => {
    setLoggedInStatus("ログインなう")
    setUser(data.user )
  };
  
  const handleLogout = () => {
    setLoggedInStatus("未ログイン");
    setUser({});
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
   axios.get("http://52.195.43.116:8080/logged_in", { withCredentials: true })
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
  };

  function toggleModalHandler() {
    setShowModal((isShowing) => !isShowing);
  }

  return (
    <BrowserRouter>
    <main>
      <Header
      loggedInStatus={loggedInStatus}
      handleLogout={handleLogout}
      />
      <h1>ここはAPPの場所</h1>
      <Hellow />
      
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
            path="/signup"
            element={<SignIn />}
          />
           <Route
            path="/logged_in"
            element={<Login />}
          />
          <Route
            exact path={'/posts/new'}
            element={<Post />}
          />
      
          
        <Route
          exact path={`/users/${user.id}`}
          element={<Mypage/>}
        />

        </Routes>
      
    </main>
    </BrowserRouter>
  );
}
export default App;
