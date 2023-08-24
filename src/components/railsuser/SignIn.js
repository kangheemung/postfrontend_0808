import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";




const SignIn = () => {
 
  const navigate = useNavigate();
  const [csrfToken, setCsrfToken] = useState('');
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };
  

  useEffect(() => {
    const fetchCsrfToken  = async () => {
      try {
        const response = await axios.get("http://52.195.43.116:8080/csrf-token", {
          withCredentials: true,
        });
        
        const token = response.data.csrfToken;
        fetchCsrfToken(token);

      } catch (error) {
        console.error(error);
      }
    };

    fetchCsrfToken(); 
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation
      };

      const response = await axios.post(
        "http://52.195.43.116:8080/signup",
        {
          user:user
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
        navigate(`/users/${response.data.id}`, { state: { csrfToken } });
      } else {
        console.error("User ID not found in response");
        navigate("/");
      }
    } catch (error) {
      console.error(error);

      if (error.response && error.response.data) {
        console.log(error.response); // Display the error message from the server
      }

      navigate("/");
    }
  };

  return (
    <div>
      <h1>Login Account</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password_confirmation">Password Confirmation</label>
          <input
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            onChange={handleChange}
          />
          <input type="hidden" name="_csrf" value={csrfToken} />
      
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
