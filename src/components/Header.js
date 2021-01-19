import React from 'react';
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className="header">
            <h3>Search</h3>
            <Link className="link" to="/">
                <h2>Recipes</h2>
            </Link>
            <Link className="link" to="/admin">
                <h3>Admin</h3>
            </Link>
        </div>
    )
}

export default Header;
