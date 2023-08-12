import React from 'react';
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
  const handleLogout = () => {
    axios.delete("http://52.195.43.116:8080/logout", { withCredentials: true })
      .then(response => {
        props.handleLogout();
      })
      .catch(error => console.log("ログアウトエラー", error));
  };
  
  const isLoggedIn = props.loggedInStatus;
  
  if(isLoggedIn){
    return (
      <nav>
        <ul style={ulStyle}>
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

          <li>
            <NavLink
              exact
              activeStyle={{
                fontWeight: "bold",
                color: "red"
              }}
              to="/users/:id"
            >
              Mypage
            </NavLink>
          </li>
        
          <li>
            <button onClick={handleLogout}>ログアウト</button>    
          </li>
        </ul>
      </nav>
    );
  }
   else {      
    return(
      <nav>  
        <ul style={ulStyle}>
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
        </ul>
      </nav>
    );
  }
};

export default Header;
