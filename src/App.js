import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Post from './components/Post';
import Hellow from './components/Hellow';
import SignIn from './components/railsuser/SignIn';
import Login from './components/railsuser/Login';
import Mypage from './components/Mypage';
import './App.css';

function App(props) {
  const [loggedInStatus, setLoggedInStatus] = useState('未ログイン');
  const [user, setUser] = useState({});
  const [csrfToken, setCsrfToken] = useState('');
 
  const checkLoginStatus = async () => {
    try {
      const response = await axios.get("http://52.195.43.116:8080/csrf-token", {
        withCredentials: true,
      });
  
      const token = response.data.csrfToken;
      setCsrfToken(token);
  
      // Assuming the server returns a boolean indicating whether the user is logged in or not
      const isLoggedIn = response.data.loggedIn;
      setLoggedInStatus(isLoggedIn ? "ログインなう" : "未ログイン");
  
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = (data) => {
    setLoggedInStatus("ログインなう");
    setUser(data.user);
  };

  const handleSuccessfulAuthentication = (data) => {
    handleLogin(data);
    props.history.push("/dashboard");
  }

  const handleLogoutClick = () => {
    axios.delete("http://52.195.43.116:8080/logout", { withCredentials: true })
      .then(response => {
        setLoggedInStatus("未ログイン");
        setUser({});
      })
      .catch(error => {
        console.log("ログアウトエラー", error)
      });
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <BrowserRouter>
      <main>
        <Header
          loggedInStatus={loggedInStatus}
          handleLogoutClick={handleLogoutClick}
        />
        <h1>ここはAPPの場所</h1>
        <Hellow />
        <h2>ログイン状態: {loggedInStatus}</h2>
        <Routes>
          <Route
            exact path={"/"}
            element={<Home
              handleLogin={handleLogin}
              handleLogoutClick={handleLogoutClick}
              loggedInStatus={loggedInStatus}
              handleSuccessfulAuthentication={handleSuccessfulAuthentication}
            />}
          />
          <Route
            exact path={"/dashboard"}
            element={<Dashboard loggedInStatus={loggedInStatus} />}
          />
          <Route
            path="/signup"
            element={<SignIn handleSuccessfulAuthentication={handleSuccessfulAuthentication} />}
          />
          <Route
            path="/login"
            element={<Login handleSuccessfulAuthentication={handleSuccessfulAuthentication}/>}
          />
          <Route
            exact path={'/posts/new'}
            element={<Post />}
          />

          <Route
            exact path={`/users/:id`}
            element={<Mypage />}
          />
        </Routes>

      </main>
    </BrowserRouter>
  );
}

export default App;
