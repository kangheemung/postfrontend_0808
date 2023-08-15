import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


export const Mypage = () => {
  const [user, setUser] = useState(null); // Changing users state to user since you are accessing a single user
  const navigate = useNavigate();
  const { id } = useParams(); // Access the user ID from the URL parameter

  useEffect(() => {
    console.log(id); // Add this line to check the value of id
    axios.get(`http://52.195.43.116:8080/users/${id}`)
      .then(res => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [id]);
  

  const updateUser = () => {
    const data = { 
      id: user.id,
      name: user.name, 
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation // Fixing typo in password_confirmation field name
    };

    axios.patch(`http://52.195.43.116:8080/users/${user.id}/edit`, data)
      .then(res => {
        setUser(res.data); // Update the user state with the response data
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>mypage</h1>
      {user ? (
        <>
          <p>
            <Link to={`/users/${user.id}`}>
              {user.name}
            </Link>
          </p>
          <p>こんにちは{user.name}様</p>
          <p>あなたのemailは{user.email}です。</p>
          <button onClick={updateUser}>Update User</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Mypage;
