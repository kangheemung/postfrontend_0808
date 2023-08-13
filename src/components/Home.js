import React, { useState } from 'react';
import SignIn from './railsuser/SignIn';
import Login from './railsuser/Login';
import axios from 'axios'
export default function Home(props) {
    const [token, setToken] = useState();
    const handleSuccessfulAuthentication = (data) => {
        props.handleLogin(data);
        props.history.push("/dashboard");
    }
    if(!token) {
        return <Login setToken={setToken} />
      }

    return (
        <div>
            <h1>Home</h1>
            <h2>ログイン状態: {props.loggedInStatus}</h2>

              
              
            <SignIn handleSuccessfulAuthentication={handleSuccessfulAuthentication}/>
            <Login handleSuccessfulAuthentication={handleSuccessfulAuthentication}/>
        </div>
    );
}