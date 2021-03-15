import React from 'react';
import Navbar from './Navbar';
const Header = () => {
    return (
        <div id="main">
            <Navbar />
            <div className="name">
                <h1><span>EverHustle</span></h1>
                <div className="underline"></div>
                <h2> Your personalised productivity partner </h2>
                <p className="details">Feeling unproductive in lockdown? <br/> EverHustle will help you become a consistent hustler</p>
               
            </div>
        </div>
    )
}

export default Header
