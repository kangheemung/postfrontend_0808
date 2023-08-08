import React, { useState } from 'react'
import axios from 'axios'
export default function Login(props) {
	
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
   

    const handleSubmit = (event) => {
        console.log("イベント発火")
        event.preventDefault()
        const handleSubmit = (event) => {
            axios.post("http://52.195.43.116:3000/login",
                {
                    user: {
                     
                        email: email,
                        password: password
                       
                    }
                },
                { withCredentials: true }
            ).then(response => {
    
                // 追加
                if (response.data.logged_in) {
                    props.handleSuccessfulAuthentication(response.data)
                }
    
            }).catch(error => {
                console.log("registration error", error)
            })
    
    
            event.preventDefault()
        }
    }

    return (
        <div>
            <p>ログイン</p>

           {/* onSubmit、onChangeイベントを追加 */}
            <form onSubmit={handleSubmit}>
			
                <input
                    type="email"
                    name="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="パスワード"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />

                <button type="submit">登録</button>
            </form>
        </div>
    )
}
