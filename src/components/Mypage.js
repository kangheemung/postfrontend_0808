import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Mypage({ loggedInStatus }) {
  const [user, setUser] = useState(true);
  const { id } = useParams();
  const csrfTokenRef = useRef(true);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://52.195.43.116:8080/users/${id}`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchUser();
  }, [id]);
  



  const updateUser = () => {
    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation
    };

    const csrfToken = csrfTokenRef.current;
    axios
      .patch(`http://52.195.43.116:8080/users/${user.id}/edit`, data, {
        headers: {
          'X-CSRF-Token': csrfToken.current
        }
        
      })
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
      {loggedInStatus ?  (
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
          <p>Loading...</p>
        </>
      )}
    </div>
  );
}
