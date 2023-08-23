import { useParams, Link } from "react-router-dom";

const ulStyle = {
  display: "flex",
  listStyleType: "none",
  padding: "20px 30px",
  background: "#eee",
  margin: 0,
};

const Header = ({ handleLogout, loggedInStatus}) => {
  const { id } = useParams();
  return (
    <nav>
      <ul style={ulStyle}>
      <li>{loggedInStatus ? "Logged In" : "Logged Out"}</li>
        
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
            {loggedInStatus ? (  
              <>   
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
  )};

export default Header;