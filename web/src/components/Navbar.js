// web/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/minecraft">Minecraft</Link></li>
                <li><Link to="/project-zomboid">Project Zomboid</Link></li>
                <li><Link to="/assetto-corsa">Assetto Corsa</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
