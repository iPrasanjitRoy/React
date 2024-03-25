import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"; 


export default function Navbar(props) {
    return (
        <div>
            <nav className="navbar">
                <div className="container">
                    <div className="logo">
                        <a href="/">Your Logo</a>
                    </div>
                    <ul className="nav-links">
                        <li className="nav-item"> 
                            <Link to="/">{props.HomeLinkText}</Link> 
                        </li>


                        <li className="nav-item">
                            <a href="/services">{props.ServicestLinkText}</a>
                        </li>
                        <li className="nav-item">
                        <Link to="/About">About</Link> 
                        </li>
                        <li className="nav-item">
                            <a href="/contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>

        </div>
    )
}


Navbar.propTypes = {
    HomeLinkText: PropTypes.string.isRequired,
}

Navbar.defaultProps = {
    ServicestLinkText: "Services"

}