import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Post from './components/Post';
import SignIn from './components/railsuser/SignIn';
import Login from './components/railsuser/Login';
import './App.css';
import Mypage from './components/Mypage';


const handleSuccessfulAuthentication = async (csrfToken, setLoggedInStatus) => {
  try {
    const response = await axios.get(
      "http://52.195.43.116:8080/csrf-token",
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        withCredentials: true,
      }
    );

    // Assuming the server returns a boolean indicating whether the user is logged in or not
    const isLoggedIn = response.data.loggedIn;
    setLoggedInStatus(isLoggedIn ? "ログインなう" : "未ログイン");

  } catch (error) {
    console.error(error);
  }
};

const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");
  const [csrfToken, setCsrfToken] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://52.195.43.116:8080/csrf-token", { withCredentials: true });
        const token = response.data.csrfToken;
        setCsrfToken(token);
        await axios.get("http://52.195.43.116:8080/logged_in", {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': token,
          },
          withCredentials: true,
        })
        .then(res => {
          const isLoggedIn = res.data.loggedIn;
          setLoggedInStatus(isLoggedIn ? "ログインなう" : "未ログイン");
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handleLogoutClick = async () => {
    try {
      await axios.delete("http://52.195.43.116:8080/logout", { withCredentials: true });
      setLoggedInStatus("未ログイン");
    } catch (error) {
      console.error("ログアウトエラー", error);
    }
  };

  return (
    <Router>
      <main>
    
      <Header loggedInStatus={loggedInStatus} handleLogoutClick={handleLogoutClick} />
   
        <h1>ここはAPPの場所</h1>
        <h2>ログイン状態: {loggedInStatus}</h2>
        <Routes>
      
          {loggedInStatus === "未ログイン" ? (
            <>
              <Route path="/" element={<Home handleSuccessfulAuthentication={handleSuccessfulAuthentication} />} />
              <Route path="/signup" element={<SignIn handleSuccessfulAuthentication={handleSuccessfulAuthentication} />} />
              <Route path="/login" element={<Login csrfToken={csrfToken} handleSuccessfulAuthentication={handleSuccessfulAuthentication} />} />
            </>
          ) : (
            <>
          
         
              <Route exact path={`/users/${id}`} element={<Mypage loggedInStatus={loggedInStatus} />} />
              <Route exact path={'/posts/new'} element={<Post />} />
              <Route exact path={"/dashboard"} element={<Dashboard loggedInStatus={loggedInStatus} />} />
            
            </>
          )}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
