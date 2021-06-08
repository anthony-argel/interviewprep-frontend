import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const submitForm = (e) => {
        e.preventDefault();
        if(props.apiURL === '') return;
        if(password !== rePassword) {
            setErrors(['Passwords do not match'])
            return;
        }
        fetch(props.apiURL+'/user/', {
            method:'POST',
            mode:'cors',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({username, password, email})
        }).then(res => {
            if(res.status === 200) {
                history.push('/login');
                return;
            }
            else {
                console.log('got here');
                return res.json()
            }
            })
        .then(res => {
            if(typeof res === 'undefined') {
                setErrors(['Something went wrong. Please try again.']);
            }
            else if(res.errors.length > 0) {
                setErrors(res.errors);
            }
        })
    }

    return (
        <div className='container mb-4'>
            <div className='row justify-content-center align-items-center mt-5'>
                <div className='col-11 col-lg-5 d-flex flex-column justify-content-center align-items-center shadow-lg p-5'>
                    <h1>SIGN-UP</h1>
                    <hr className='w-100'/> 
                    <form onSubmit={submitForm}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" required onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="string" className="form-control" id="username" required onChange={e => setUsername(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" required onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="repassword" className="form-label">Re-type Password</label>
                            <input type="password" className="form-control" id="repassword" required onChange={e => setRePassword(e.target.value)}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        {errors.length > 0 ? 
                        <ul>
                            {errors.map((val, index) => {
                                return <li key={index}>{val}</li>
                            })}
                        </ul>
                        : null}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;