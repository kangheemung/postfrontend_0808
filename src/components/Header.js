import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ulStyle = {
  display: "flex",
  listStyleType: "none",
  padding: "20px 30px",
  background: "#eee",
  margin: 0,
};

const Header = (props) => {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");
  const [user, setUser] = useState({});
  const [isMember, setIsMember] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  const checkLoginStatus = () => {
    axios
      .get("http://52.195.43.116:8080/logged_in", { withCredentials: true })
      .then((response) => {
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
      .catch((error) => {
        console.log("ログインエラー", error);
      });
  };

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(
          "http://52.195.43.116:8080/csrf-token",
          { withCredentials: true }
        );

        const token = response.data.csrfToken;
        setCsrfToken(token);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleLogout = () => {
    axios
      .delete("http://52.195.43.116:8080/logout", { withCredentials: true })
      .then((response) => {
        props.handleLogoutClick();
      })
      .catch((error) => console.log("ログアウトエラー", error));
  };

  useEffect(() => {
    checkLoginStatus();
  }, [loggedInStatus]);

  return (
    <nav>
      <ul style={ulStyle}>
        <li>{csrfToken}</li>
        <li>
          <Link to="http://52.195.43.116:8080/logged_in">
            ログイン状態: {loggedInStatus}
          </Link>
          {loggedInStatus === "ログインなう" && <span>{user.name}</span>}
        </li>

        {/* Conditional rendering based on login and membership status */}
        {loggedInStatus === "ログインなう" ? (
          <>
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
                to={`/users/${user.id}`}
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
                to="/logged_in"
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
