import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

const NavBar = (props) => {
    const history = useHistory();
    const [navQuery, setNavQuery] = useState('');

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        props.setLoggedIn(false);
    }

    function searchQuestion(e) {
        e.preventDefault();
        if(navQuery === '') return;
        const searchString = navQuery.split(' ').join('-');
        history.push('/search/'+searchString+'/1');
        setNavQuery('');
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
                <li className="nav-item">
                    <Link className="nav-link" to='/browse/1'>Browse</Link>
                </li>
                {
                    props.loggedIn ?
                    <li className="nav-item">
                        <Link className="nav-link" to='/add'>Add Question</Link>
                    </li>
                    :
                    null 
                }
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
                <form onSubmit={searchQuestion}>
                    <div className="input-group"> 
                    <input className="form-control" type="search" placeholder="Search" aria-label="Search" aria-describedby="search-question-button" value={navQuery} onChange={e => setNavQuery(e.target.value)}/>
                    <button className="btn btn-outline-success" type="submit" id="search-question-button">Search</button>
                    </div>
                </form>
            </div>
            </div>
        </nav>
    )
}

export default NavBar;