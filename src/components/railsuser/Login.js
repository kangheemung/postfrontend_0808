import React, { useState } from 'react';
import axios from 'axios';

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {

        axios.post(
            "http://52.195.43.116:8080/login",
            {user:{
                email: email,
                password: password
            }},
            { headers: {
                  'Content-Type': 'application/json', 
                }
            },{ withCredentials: true }
        )
        .then(response => {
            if (response.data.logged_in) {
                props.handleSuccessfulAuthentication(response.data)
            }
        })
        .catch(error => {
            console.log("signin error", error);
        })
        event.preventDefault()
    }

    return (
        <div className="signup_body">
            <p>ログイン</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        className="name_box"
                        type="email"
                        name="email"
                        placeholder="メールアドレス"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                </div>
                <div>
                    <input
                        className="name_box"
                        type="password"
                        name="password"
                        placeholder="パスワード"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit" className="button">ログイン</button>
            </form>
        </div>
    );
}
