import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const Mypage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [csrfToken, setCsrfToken] = useState(null);
      useEffect(() => {
        const checkLoginStatus = async () => {
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

        checkLoginStatus();
    
    // Move the axios.get call here
    if (id) {
      axios
        .get(`http://52.195.43.116:8080/users/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken
          },
          withCredentials: true
        })
        .then(res => {
          console.log(res.data);
          setUser(res.data.user);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [id, csrfToken]);

  const updateUser = () => {
    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation
    };

    axios
      .patch(`http://52.195.43.116:8080/users/${user.id}/edit`, data)
      .then(res => {
        setUser(res.data.user);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Mypage</h1>
      {user ? (
        <>
          <p>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </p>
          <p>こんにちは{user.name}様</p>
          <p>あなたのemailは{user.email}です。</p>
          <button onClick={updateUser}>Update User</button>
        </>
      ) : (
        <>
          <p>こんにちは{user.name}様</p>
          <p>Loading...</p>
        </>
      )}
    </div>
  );
};

export default Mypage;