import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Mypage from './components/Mypage';
import Post from './components/Post';
import SignIn from './components/railsuser/SignIn';
import Login from './components/railsuser/Login';
import './App.css';



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
    const loggedIn = response.data.logged_in; // Fix variable name
    setLoggedInStatus(loggedIn ? "ログインなう" : "未ログイン"); // Update the loggedInStatus state
  } catch (error) {
    console.error(error);
  }
};


const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenResponse = await axios.get("http://52.195.43.116:8080/csrf-token", 
        { withCredentials: true }
        );
        const token = tokenResponse.data.csrfToken;
        setCsrfToken(token);
  
        const loggedInResponse = await axios.get("http://52.195.43.116:8080/logged_in", {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': token,
          },
          withCredentials: true,
        });
        setLoggedInStatus(loggedInResponse.data.logged_in ? "ログインなう" : "未ログイン"); // Remove isLoggedIn variable
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  
    
  
  const handleLogout = async () => {
    try {
      const response = await axios.delete(
        "http://52.195.43.116:8080/logout",
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
          withCredentials: true,
        }
      );
  
      console.log(response.status);
      // Call the handleLogout prop passed from parent
      setLoggedInStatus( "未ログイン"); // Update the login status after successful logout
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
        handleLogout={handleLogout} // Pass the handleLogout function as a prop
      />
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
              <Route exact path="/users/:id" element={<Mypage loggedInStatus={loggedInStatus} />} />
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
