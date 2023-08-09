import React, { useState } from "react";
import axios from "axios";

const SignIn = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation
    };
    axios.post(
      "http://52.195.43.116:8080/signup",
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
         
        }
      }
    )
      .then((response) => {
        console.log(response.status, response.data.token);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Login Account</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="name"
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
          <label htmlFor="password_confirmation">Password Confirmation</label>
          <input
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            onChange={handleChange}
          />
          <button type="submit">Sign_in</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
