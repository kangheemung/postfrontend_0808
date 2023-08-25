import { useParams, Link } from "react-router-dom";

const ulStyle = {
  display: "flex",
  listStyleType: "none",
  padding: "20px 30px",
  background: "#eee",
  margin: 0,
};

const Header = ({ loginSuccess, loggedInStatus, handleLogout  }) => {
  const { id } = useParams();


  return (
    <nav>
      <ul style={ulStyle}>
        <li>{loggedInStatus ? "In" : "Out"}</li>

        <li>
          <Link
           
            to="/"
          >
            Top
          </Link>
        </li>
        {loggedInStatus ?  (  
          <>   
            <li>
              <Link
                
                to="/posts/new"
              >
                New Post
              </Link>
            </li>
            <li>
              <Link
                
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
                
                to="/posts"
              >
                Postindex
              </Link>
            </li>
            <li>
              <Link
                
                to="/login"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                
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