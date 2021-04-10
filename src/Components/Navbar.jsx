import React, {useState} from 'react'
import logo from '../images/EverHustle.PNG';
import { Link } from 'react-router-dom';
const Navbar = () => {

    const [nav, setNav] = useState(false)

    const changeBackground = () => {
        if (window.scrollY >= 50) {
            setNav(true);
        }
        else {
            setNav(false);
        }
    }

    window.addEventListener('scroll', changeBackground);
    return (
        <nav className={nav ? 'nav active': 'nav'}>
            <a href="/" className="logo" style={{backgroundColor: 'inherit'}}>
                <img src={logo} alt="" id="logo-img"/>
            </a>
            <input type="checkbox" id="menu-btn" className="menu-btn" />
            <label htmlFor="menu-btn" className="menu-icon">
                <span className="nav-icon"></span>
            </label>

            <ul className="menu">
                <li><Link to="/notes">Notes</Link></li>
                <li><Link to="/articles">Articles</Link></li>
                <li><Link to="/goals">Goals</Link></li>
                <li><Link to="/reminders">Reminders</Link></li>
                <li><Link to="/timers">Timers</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar
