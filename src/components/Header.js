import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ulStyle = {
  display: "flex",
  listStyleType: "none",
  padding: "20px 30px",
  background: "#eee",
  margin: 0,
};

const Header = ({ handleLogout, loggedInStatus }) => {
  const [csrfToken, setCsrfToken] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(
          "http://52.195.43.116:8080/csrf-token",
          {
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-Token": csrfToken,
            },
            withCredentials: true,
          }
        );
  
        const token = response.data.csrfToken;
        setCsrfToken(token);
      } catch (error) {
        console.log("CSRF Token Error", error);
      }
    };
  
    fetchCsrfToken();
  }, [csrfToken]);
  



  




  return (
    <nav>
      <ul style={ulStyle}>
        <li>{csrfToken}</li>

        {loggedInStatus === "ログインなう" ? (
          <>
           <li>Logged In</li>
            <li>
              <Link
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                }}
                to="/"
              >
                Top
              </Link>
            </li>
            <li>
              <Link
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                }}
                to="/posts/new"
              >
                New Post
              </Link>
            </li>
            <li>
              <Link
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                }}
                to={`/users/${id}`} 
              >
                Mypage
              </Link>
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
          <li>Logged Out</li> 
             <li>
              <Link
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                }}
                to="/"
              >
                Top
              </Link>
            </li>
            <li>
              <Link
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                }}
                to="/posts"
              >
                Postindex
              </Link>
            </li>
            <li>
              <Link
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                }}
                to="/login"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                activeStyle={{
                  fontWeight: "bold",
                  color: "red",
                }}
                to="/signup"
              >
                SignIN
              </Link>
            </li> 
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
