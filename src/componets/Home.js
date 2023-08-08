import React from 'react'
import SignIn from './componets/railsuser/SignIn';
export default function Home(props) {
    return (
        <div>
            <h1>Home</h1>
            <h2>ログイン状態: {props.loggedInStatus}</h2>
            <SignIn/>
        </div>
    )
}