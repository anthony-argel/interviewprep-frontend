import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const history = useHistory();

    const submitForm = (e) => {
        if(props.apiURL === '') return;
        e.preventDefault();
        fetch(props.apiURL+'/user/login', {
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({username: username, password: password}),
            mode: 'cors'
        })
        .then(res => {
            if(res.status === 200) {
                props.setLoggedIn(true);
                return res.json();
            }
            else {
                setErrors(true);
            }
        })
        .then(res => {
            if(typeof res !== 'undefined') {
                localStorage.setItem('token', res.token);
                localStorage.setItem('id', res.id);
                history.push('/');
            }
        })
    }

    return (
        <div className='container mb-4'>
            <div className='row justify-content-center align-items-center mt-5'>
                <div className='col-11 col-lg-5 d-flex flex-column justify-content-center align-items-center shadow-lg p-5'>
                    <h1>LOGIN</h1>
                    <hr className='w-100'/> 
                    <form onSubmit={submitForm}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="string" className="form-control" id="username" required onChange={e => setUsername(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" required onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        {errors ? <p className='mt-3'>Failed to log in. Please try again.</p> : null}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;