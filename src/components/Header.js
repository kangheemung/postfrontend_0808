import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const ulStyle = {
  display: 'flex',
  listStyleType: 'none',
  padding: '20px 30px',
  background: '#eee',
  margin: 0,
};

const Header = (props) => {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");
  const [user, setUser] = useState({});
  const [isMember, setIsMember] = useState(false);

  const checkLoginStatus = () => {
    axios.get("http://52.195.43.116/logged_in", { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          setLoggedInStatus("ログインなう");
          setIsMember(response.data.is_member);
          setUser(response.data.user);
        } else {
          setLoggedInStatus("未ログイン");
          setIsMember(false);
          setUser({});
        }
      })
      .catch(error => {
        console.log("ログインエラー", error);
      });
  };
  
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    axios.delete("http://52.195.43.116:8080/logout", { withCredentials: true })
      .then(response => {
        props.handleLogoutClick();
      })
      .catch(error => console.log("ログアウトエラー", error));
  };

  useEffect(() => {
    checkLoginStatus();
  }, [loggedInStatus]);
  
  return (
    <nav>
      <ul style={ulStyle}>
        <li>
          <a>ログイン状態: {loggedInStatus}</a>
        </li>

        {/* Conditional rendering based on login and membership status */}
        {loggedInStatus === "ログインなう" ? (
          <>
            <li>
              <NavLink
                exact
                activeStyle={{
                  fontWeight: "bold",
                  color: "red"
                }}
                to="/"
              >
                Top
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeStyle={{
                  fontWeight: "bold",
                  color: "red"
                }}
                to="/posts/new"
              >
                New Post
              </NavLink>
            </li>
            {(isMember && (
              <li>
                <NavLink
                  exact
                  activeStyle={{
                    fontWeight: "bold",
                    color: "red"
                  }}
                  to={`/users/${user.id}`}
                >
                  Mypage
                </NavLink>
              </li>
            ))}
            <li>
              <button onClick={handleLogout}>ログアウト</button>    
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                exact
                activeStyle={{
                  fontWeight: "bold",
                  color: "red"
                }}
                to="/"
              >
                Top
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeStyle={{
                  fontWeight: "bold",
                  color: "red"
                }}
                to="/posts/index"
              >
                Postindex--
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeStyle={{
                  fontWeight: "bold",
                  color: "red"
                }}
                to="/logged_in"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeStyle={{
                  fontWeight: "bold",
                  color: "red"
                }}
                to="/signup"
              >
                SignIN
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
