import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        toggleMenu();
    };

    return (
        <nav className="navbar">
            <div className="nav-content">
                <div className="logo">🌾 Farmer's Hub</div>
                
                {/* Hamburger button */}
                <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
                    <span className={`bar ${isOpen ? 'active' : ''}`}></span>
                    <span className={`bar ${isOpen ? 'active' : ''}`}></span>
                    <span className={`bar ${isOpen ? 'active' : ''}`}></span>
                </button>

                {/* Navigation links */}
                <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/weather">Weather</Link></li>
                    <li><Link to="/crop-tips">Crop Tips</Link></li>
                    <li><Link to="/market">Market Prices</Link></li>
                    <li><Link to="/forum">Community Forum</Link></li>
                    <li><Link to="/shop">E-commerce</Link></li>
                    <li><Link to="/support">Support</Link></li>
                    {user ? (
                        <>
                            <li className="user-name">Welcome, {user.name}</li>
                            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                        </>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
