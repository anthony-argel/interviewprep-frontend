import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        props.setLoggedIn(false);
    }

    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
            <Link className="navbar-brand" to='/'>Home</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {props.loggedIn ? 
                <li className="nav-item">
                    <p className="nav-link mb-0" onClick={logout} style={{cursor:'pointer'}}>Logout</p>
                </li>
                :
                <div className='d-flex'>
                <li className="nav-item">
                    <Link className="nav-link" to='/signup'>Signup</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/login'>Login</Link>
                </li>
                </div>
                }
                </ul>
                <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            </div>
        </nav>
    )
}

export default NavBar;