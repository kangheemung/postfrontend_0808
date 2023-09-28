import React, {useState} from 'react'
import { Navigate } from 'react-router-dom'

export default function Register( setToken) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const handleOnChange = (e) =>{
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }
  const handleOnSubmit = async (e) =>{
           e.preventDefault()
  const response = await fetch('http://18.179.41.255:8080/signup',{
          method:'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(userData)
  });
    const data = await response.json();
    console.log(data)
    setToken(data.access_token)
    Navigate('/mypage')
  }
  return (
    <div>
      <h1>会員登録</h1>
      <form onSubmit= {handleOnSubmit}>
        name: <input type="text" name="name" value={userData.name} onChange = {handleOnChange} /><br />
        email: <input type="text" name="email" value={userData.email} onChange = {handleOnChange} /><br />
        password: <input type="password" name="password" value={userData.password} onChange = {handleOnChange} /><br/>
        password_confirmation: <input type="password" name="password_confirmation" value={userData.password_confirmation} onChange={handleOnChange} /><br />
        <input type="submit" value="登録"/>
      </form>
    </div>
  )
}

