import React from 'react'
import { Link } from "react-router-dom";
import './LoginHeader.css';
import logo1 from "./logo1.png"

function LoginHeader() {
    return (
        <div className="header">
            <Link className="link" to="/">
                <img className="header__logo1" src={logo1} alt="Hello text Logo" />
            </Link>
            <Link className="link" to="/register">
                <button className="header__button1">Create New Account</button>
            </Link>
        </div>
    )
}

export default LoginHeader
