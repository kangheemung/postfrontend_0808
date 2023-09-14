import React, {useState} from 'react'

export default function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })
  const handleOnChange=(e)=>{
    setuserData({
      ...userData,[e.target.name]: e.target.value
    })

  }

  return (
    <div>
      <h1>会員登録</h1>
      <form>
        email: <input type="text" name="email" value={userData.email} onChange={handleOnChange} /><br />
        password: <input type="password" name="password" value={userData.password} onChange={handleOnChange} /><br />
      </form>
    </div>
  )
}
