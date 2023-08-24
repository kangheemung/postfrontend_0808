import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Mypage from './components/Mypage';
import Post from './components/Post';
import SignIn from './components/railsuser/SignIn';
import Login from './components/railsuser/Login';
import './App.css';

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(true);
  const [csrfToken, setCsrfToken] = useState("");
  


  const checkLoginStatus = useCallback(() => {
    axios
      .get('http://52.195.43.116:8080/logged_in', {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        withCredentials: true,
      })
      .then(response => {
        if (response.data.logged_in) {
          setLoggedInStatus(true);
        }
      });
  }, [csrfToken]);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const handleLogout = () => {
    setLoggedInStatus(false);
  };

  const handleLogin = (data) => {
    setLoggedInStatus(true);
    setCsrfToken(data.csrf_token);
    setLoginSuccess(data.logged_in);
  };
  
  
  

  return (
    <Router>
      <main>
        <Header
          loginSuccess={loginSuccess}
          loggedInStatus={loggedInStatus}
          handleLogout={handleLogout}
          handleLogin={handleLogin}
        />
        <h1>ここはAPPの場所</h1>
        <h2>ログイン状態: {loggedInStatus && loginSuccess ? 'In' : 'Out'}</h2>
        <Routes>
          <Route path="/" element={<Home handleLogin={handleLogin} />} />
          {loggedInStatus && loginSuccess ? (
            <>
              <Route exact path="/users/:id" element={<Mypage csrfToken={csrfToken} loggedInStatus={loggedInStatus} handleLogin={handleLogin} />} />
              <Route exact path={'/posts/new'} element={<Post />} />
            </>
          ) : (
            <>
              <Route path="/signup" element={<SignIn csrfToken={csrfToken} loggedInStatus={loggedInStatus} handleLogin={handleLogin} />} />
              <Route path="/login" element={<Login csrfToken={csrfToken} loggedInStatus={loggedInStatus} handleLogin={handleLogin} />} />
            </>
          )}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
