import React, { useState } from "react";
import logo from "../images/EverHustle.PNG";
import { Link, NavLink, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../context/auth.context";
const Navbar = () => {
  const { authState, actions } = useAuth();
  const [nav, setNav] = useState(false);
  const history = useHistory();
  const [menu, setMenu] = useState(false)
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
      <Link to="/" className="logo" style={{ backgroundColor: "inherit", marginRight: "auto", paddingLeft: "20px" }}>
        <img src={logo} alt="logo" id="logo-img" />
      </Link>
      <input type="radio" id="menu-btn" className={menu ? "menu-btn" : "null"} style={{display:"none"}}/>
      <label htmlFor="menu-btn" className="menu-icon" onClick={()=>setMenu(!menu)}>
        <span className="nav-icon"></span>
      </label>

      <ul className="menu" style={{paddingRight: "20px"}}>
        {/* {authState.user ? <li>hello {authState.user.firstName}</li> : null} */}
        {authState.user ?
          <>
          <li onClick={()=>setMenu(false)}>
          <NavLink to="/notes" activeClassName="active-btn">Notes</NavLink>
          </li>
          <li onClick={()=>setMenu(false)}>
            <NavLink to="/articles" activeClassName="active-btn">Articles</NavLink>
          </li>
          <li onClick={()=>setMenu(false)}>
            <NavLink to="/goals" activeClassName="active-btn">Goals</NavLink>
          </li>
          <li onClick={()=>setMenu(false)}>
            <NavLink to="/reminders" activeClassName="active-btn">Reminders</NavLink>
          </li>
          <li onClick={()=>setMenu(false)}>
            <NavLink to="/timers" activeClassName="active-btn">Timers</NavLink>
          </li>
          </>
          : null}
        <li onClick={()=>setMenu(false)}>
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
