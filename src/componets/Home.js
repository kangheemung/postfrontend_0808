import React from 'react'
import SignIn from './railsuser/SignIn';
import Login from './railsuser/Login';
import axios from 'axios'
export default function Home(props) {

    const handleSuccessfulAuthentication = (data) => {
        props.handleLogin(data);
        props.history.push("/dashboard");
    }

     // handleLogoutClickイベントハンドラ
     const handleLogoutClick = () => {
        axios.delete("http://localhost:3001/logout", { withCredentials: true })
            .then(response => {
                props.handleLogout()
            }).catch(error => console.log("ログアウトエラー", error))
    }

    return (
        <div>
            <h1>Home</h1>
            <h2>ログイン状態: {props.loggedInStatus}</h2>

               {/* ボタン追加 */}
               <button onClick={handleLogoutClick}>ログアウト</button>

            <SignIn handleSuccessfulAuthentication={handleSuccessfulAuthentication}/>
            <Login handleSuccessfulAuthentication={handleSuccessfulAuthentication}/>
        </div>
    );
}