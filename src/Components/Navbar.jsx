import React, {useState} from 'react'
import logo from '../images/EverHustle.PNG';
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
            <a href="#" className="logo">
                <img src={logo} alt="" id="logo-img"/>
            </a>
            <input type="checkbox" id="menu-btn" className="menu-btn" />
            <label htmlFor="menu-btn" className="menu-icon">
                <span className="nav-icon"></span>
            </label>

            <ul className="menu">
                <li><a href="#" className="">Notes</a></li>
                <li><a href="#">Articles</a></li>
                <li><a href="#">Goals</a></li>
                <li><a href="#">Reminders</a></li>
                <li><a href="#">Timers</a></li>
                
            </ul>
        </nav>
    )
}

export default Navbar
