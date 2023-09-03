import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ csrfToken }) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = data;
  const session = { email, password };
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://${process.env.REACR_APP_API_IP}:8080/login`,
        { session },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
          withCredentials: true
        }
      );

      console.log(response.status, response.data);

      if (response.data.id) {
        navigate(`/users/${response.data.id}`);
      } else {
        console.error("User is not logged in");
        navigate("/");
      }
    } catch (error) {
      console.error(error);

      if (error.response && error.response.data) {
        console.log(error.response); 
      } else {
        setError("An error occurred while logging in");
      }
    }
  };

  return (
    <div className="signup_body">
      {error && <p className="error">{error}</p>}
      <p>ログイン</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="name_box"
            type="email"
            name="email"
            placeholder="メールアドレス"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className="name_box"
            type="password"
            name="password"
            placeholder="パスワード"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="button">ログイン</button>
      </form>
    </div>
  );
}
