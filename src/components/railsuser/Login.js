import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Login(props) {
  const navigate = useNavigate();
  //const params = useParams();
  const [csrfToken, setCsrfToken] = useState('');
  
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

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get("http://52.195.43.116:8080/csrf-token", {
          withCredentials: true,
        });

        const token = response.data.csrfToken;
        setCsrfToken(token);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
  
      const response = await axios.post(
        "http://52.195.43.116:8080/login",
        { 
         session
        },
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
        <input type="hidden" name="_csrf" value={csrfToken} />

        <button type="submit" className="button">ログイン</button>
      </form>
    </div>
  );
}
