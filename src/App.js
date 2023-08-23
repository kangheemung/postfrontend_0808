import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';

import Mypage from './components/Mypage';
import Post from './components/Post';
import SignIn from './components/railsuser/SignIn';
import Login from './components/railsuser/Login';
import './App.css';

const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenResponse = await axios.get("http://52.195.43.116:8080/csrf-token", { withCredentials: true });
        setCsrfToken(tokenResponse.data.csrfToken);
    
        const loggedInResponse = await axios.get("http://52.195.43.116:8080/logged_in", { withCredentials: true });
        setLoggedInStatus(loggedInResponse.data.logged_in); // Update loggedInStatus after checking login status
    
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSuccessfulAuthentication = async () => {
    try {
      await axios.post(
        "http://52.195.43.116:8080/login",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
          withCredentials: true,
        }
      );

      const fetchData = async () => {
        try {
          const tokenResponse = await axios.get("http://52.195.43.116:8080/csrf-token", { withCredentials: true });
          setCsrfToken(tokenResponse.data.csrfToken);

         await axios.get("http://52.195.43.116:8080/logged_in", { withCredentials: true });
          setLoggedInStatus(true);  // Update loggedInStatus after checking login status

        } catch (error) {
          console.error(error);
        }
      };

      fetchData();

    } catch (error) {
      console.error(error);
      // Handle error during login
    }
  };

  const handleLogout = async () => {
    try {
      await axios.delete(
        "http://52.195.43.116:8080/logout",
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
          withCredentials: true,
        }
      );

      const loggedInResponse = await axios.get("http://52.195.43.116:8080/logged_in", {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        withCredentials: true,
      });

      setLoggedInStatus(loggedInResponse.data.logged_in);

    } catch (error) {
      console.error(error);
      // Handle error during logout
    }
  };

  return (
    <Router>
      <main>
        <Header
          loggedInStatus={loggedInStatus}
          handleLogout={handleLogout} 
         // Pass the handleLogout function as a prop
        />
        <h1>ここはAPPの場所</h1>
        <h2>ログイン状態: {loggedInStatus ? "Logged In" : "Logged Out"}</h2>
        <Routes>
          <Route path="/" element={<Home handleSuccessfulAuthentication={handleSuccessfulAuthentication} />} />
          {loggedInStatus ? (
            <>
              <Route exact path="/users/:id" element={<Mypage csrfToken={csrfToken} loggedInStatus={loggedInStatus} handleSuccessfulAuthentication={handleSuccessfulAuthentication}  />} />
              <Route exact path={'/posts/new'} element={<Post />} />
            </>
          ) : (
            <>
              <Route path="/signup" element={<SignIn csrfToken={csrfToken} loggedInStatus={loggedInStatus} handleSuccessfulAuthentication={handleSuccessfulAuthentication} />} />
              <Route path="/login" element={<Login csrfToken={csrfToken} loggedInStatus={loggedInStatus} handleSuccessfulAuthentication={handleSuccessfulAuthentication} />} />
            </>
          )}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
