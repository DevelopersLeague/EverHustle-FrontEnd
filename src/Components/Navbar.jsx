import React, { useState } from "react";
import logo from "../images/EverHustle.PNG";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../context/auth.context";
const Navbar = () => {
  const { authState, actions } = useAuth();
  const [nav, setNav] = useState(false);
  const history = useHistory();

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  window.addEventListener("scroll", changeBackground);
  return (
    <nav className={nav ? "nav active" : "nav"}>
      <Link to="/" className="logo" style={{ backgroundColor: "inherit" }}>
        <img src={logo} alt="logo" id="logo-img" />
      </Link>
      <input type="checkbox" id="menu-btn" className="menu-btn" />
      <label htmlFor="menu-btn" className="menu-icon">
        <span className="nav-icon"></span>
      </label>

      <ul className="menu">
        {/* {authState.user ? <li>hello {authState.user.firstName}</li> : null} */}
        <li>
          <Link to="/notes">Notes</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        <li>
          <Link to="/goals">Goals</Link>
        </li>
        <li>
          <Link to="/reminders">Reminders</Link>
        </li>
        <li>
          <Link to="/timers">Timers</Link>
        </li>
        <li>
          {authState.user ? (
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                actions.logout();
                history.push("/login");
              }}
            >
              logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>

        <li>{authState.user ? <div className="user-btn disabled ml-3 menu-icon">Hello {`${authState.user.firstName} `}</div> : null}</li>

      </ul>
    </nav>
  );
};

export default Navbar;
