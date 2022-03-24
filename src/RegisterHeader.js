import React from 'react'
import { Link } from 'react-router-dom';
import './RegisterHeader.css';
import logo1 from "./logo1.png"

function RegisterHeader() {
    return (
        <div className="header">
        
            <Link to="/">
                <img src={logo1} alt="Hello text Logo" className="header__logo" />
            </Link>
            <Link className="link" to="/login">
                    <button className="header__submit">Log In</button>
            </Link>
             
        </div>
    )
}

export default RegisterHeader
