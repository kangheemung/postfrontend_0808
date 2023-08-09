import React  from 'react'
import { NavLink } from 'react-router-dom'
    
    const ulStyle = {
      display: 'flex',
      listStyleType: 'none',
      padding: '20px 30px',
      background: '#eee',
      margin: 0
    }
    
    const Header = () => (
      <nav>
        <ul style={ulStyle}>
          <li style={{ flex: '1 0 auto'}}>
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
              to="/signup"
            >
               SignIN
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
              to="posts/index"
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
              to="/posts/new"
            >
               New Post
            </NavLink>
          </li>
        </ul>
      </nav>
    )
    

export default Header;