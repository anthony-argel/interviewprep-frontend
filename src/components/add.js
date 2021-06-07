import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
const Add = (props) => {
    const [question, setQuestion] = useState('');
    const history = useHistory();
    function addQuestion(e) {
        e.preventDefault();
        if(props.apiURL === '') return;
        if(question === '') return;
        if(props.apiURL.loggedIn === false) return;
        fetch(props.apiURL+'/question', {
            method:'POST',
            mode:'cors',
            headers:{"Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem('token')},
            body: JSON.stringify({question:question})
        }).then(res => res.json())
        .then(res => {
            if(typeof res !== 'undefined') {
                history.push('/question/'+res.id[0]._id)
            }
            else {
                props.setLoggedIn(false);
                localStorage.removeItem('token');
                localStorage.removeItem('id');
            }
        })
    }

    return (
    <div className='container'>
        <div className='row justify-content-center'>
            <div className='col-11 col-lg-9'>
                <h1 className='text-center'>Add a question</h1>
                <p>Note: Please make sure the question has not been asked already. All duplicate questions will be merged or deleted by a moderator.</p>
                {props.loggedIn ?
                <form onSubmit={addQuestion}>
                    <div className='input-group'>
                    <input className='form-control' onChange={e => setQuestion(e.target.value)} type='text' required id='question' aria-describedby="add-button"></input>
                    <button type='submit' className='btn btn-primary' id='add-button'>Submit</button>
                    </div>
                </form> 
                
                : <Link style={{color:'red'}} to='/login'>Please login to submit a question</Link>}
                
            </div>
        </div>
    </div>
    )
}

export default Add;