import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Login(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [csrfToken, setCsrfToken] = useState('');
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState('');
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("http://52.195.43.116:8080/csrf-token", {
          withCredentials: true,
        });
        
        const token = response.data.csrfToken;
        setCsrfToken(token);
        //axios.defaults.headers.common['X-CSRF-Token'] = token;
      } catch (error) {
        console.error(error);
        if (error.response && error.response.data) {
          setError(error.response.data.message); // Assuming the error response has a "message" field
        }
        
        navigate("/");
      }
    };

    checkLoginStatus();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user= {
        email: data.email,
        password: data.password,
      };
      if (!user.email || !user.password) {
        console.error("Email and password are required");
        return;
      }
      const response = await axios.post(
        "http://52.195.43.116:8080/login",
        user,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
          withCredentials: true
        }
      );
      console.log(response.status, response.data);
      if (response.data && response.data.logged_in) {
        navigate(`/users/${response.data.user.id}`);
      } else {
        console.error("User is not logged in");
        navigate("/");
      }
      setError(''); 
    } catch (error) {
      console.error(error);

      if (error.response && error.response.data) {
        console.log(error.response); 
        const errorMessage = error.response.data.message;
        setError(errorMessage);

      }else {
        navigate("/");
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
        <input type="hidden" name="authenticity_token" value={csrfToken} />

        <button type="submit" className="button">ログイン</button>
      </form>
    </div>
  );
}
