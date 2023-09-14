import { Link, useParams} from "react-router-dom";
import React, { useState } from 'react';

const ulStyle = {
  display: "flex",
  listStyleType: "none",
  padding: "20px 30px",
  background: "#eee",
  margin: 0,
};

function Header({ loggedInStatus, csrfToken, handleLogout }) {
  const { id } = useParams();
  const [isLoggedIn] = useState(loggedInStatus);


  return (
    <nav>
      <ul style={ulStyle}>
        {isLoggedIn ? (
          <p>ログイン状態: ログイン中</p>
        ) : (
          <p>ログイン状態: ログアウト中</p>
        )}

        <li>
          <Link to="/">Top</Link>
        </li>

        {isLoggedIn ? (
          <>
            <li>
              <Link to="/posts/new">New Post</Link>
            </li>
            <li>
              <Link to={`/users/${id}`}>My Page</Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                style={{
                  textDecoration: "none",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ログアウト
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/posts">Postindex</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">SignIN</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
