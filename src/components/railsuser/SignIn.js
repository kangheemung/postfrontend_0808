import React, { useState } from 'react'
import axios from 'axios'
export default function (props) {
	const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const handleSubmit = (event) => {
        console.log("イベント発火")
        event.preventDefault()
        const handleSubmit = (event) => {
            axios.post("http://52.195.43.116:3000/signin",
                {
                    user: {
                        name: name,
                        email: email,
                        password: password,
                        password_confirmation: passwordConfirmation
                    }
                },
                { withCredentials: true }
            ).then(response => {
    
                // 追加
                if (response.data.status === 'created') {
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
           <p>新規登録</p>

           {/* onSubmit、onChangeイベントを追加 */}
            <form onSubmit={handleSubmit}>
            <div>
            <label>name:</label>
			<input
                    type="name"
                    name="name"
                    placeholder="名前"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
            </div>
            <div>
                 <label>email:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                /> 
            </div>
            <div>
                <label>password:</label>
                <input
                    type="password"
                    name="password"
                    placeholder="パスワード"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
            </div>
            <div>
                 <label>password_confirmation:</label>
                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="確認用パスワード"
                    value={passwordConfirmation}
                    onChange={event => setPasswordConfirmation(event.target.value)}
                />
            </div>
                <button type="submit">登録</button>
            </form>
        </div>
    )
}
