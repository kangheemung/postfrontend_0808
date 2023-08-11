import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Mypage = () => {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://52.195.43.116:8080/users/:id`)
      .then(res => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const updateISCompleted = (show, user) => {
    const data = { 
      id: user.id,
      name: user.name, 
      email: user.email,
      password: user.password,
      password_conformation: user.password_conformation
    };

    axios.patch(`http://52.195.43.116:8080/users/${user.id}/edit`, data)
      .then(res => {
        const updatedUsers = [...users];
        updatedUsers[show] = { ...updatedUsers[show], is_completed: res.data.is_completed };
        setUsers(updatedUsers);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>mypage</h1>
      <table>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link
                  to={{
                    pathname: "/users/" + user.id,
                    state: { id: user.id },
                  }}
                >
                  {user.name}
                </Link>
                {user.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mypage;
