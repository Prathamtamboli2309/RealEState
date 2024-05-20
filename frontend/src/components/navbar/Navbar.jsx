import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated, userProfile } = useAppContext();
  // console.log(isAuthenticated);
  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>One Stop</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/list">List</Link>
        {/* <Link to="/">Contact</Link>
        <Link to="/">Agents</Link> */}
      </div>
      <div className="right">
        {isAuthenticated ? (
          <div className="user">
            <Link to="/">
              <button
                className="profile"
                onClick={() => {
                  setIsAuthenticated(false);
                }}
              >
                {" "}
                LogOut
              </button>
            </Link>
            <Link to="/profile">
              <button className="profile">Profile</button>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login" className="register">
              Sign in
            </Link>
            <Link to="/register" className="register">
              Sign up
            </Link>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/home">Home</Link>
          <Link to="/list">list</Link>
          {isAuthenticated ? (
            <>
              <Link to="/">
                <button
                  className="profilemob"
                  onClick={() => {
                    setIsAuthenticated(false);
                  }}
                >
                  {" "}
                  LogOut
                </button>
              </Link>
              <Link to="/profile">
                <span>Profile</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">Sign in</Link>
              <Link to="/register">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
