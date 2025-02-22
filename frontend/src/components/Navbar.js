import React from "react";
import { Link } from "react-scroll";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">🌾 Farmer's Hub</div>
            <ul>
                <li><Link to="weather" smooth={true}>Weather</Link></li>
                <li><Link to="crop-tips" smooth={true}>Crop Tips</Link></li>
                <li><Link to="market" smooth={true}>Market Prices</Link></li>
                <li><Link to="forum" smooth={true}>Community Forum</Link></li>
                <li><Link to="shop" smooth={true}>E-commerce</Link></li>
                <li><Link to="support" smooth={true}>Support</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
