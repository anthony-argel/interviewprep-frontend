import React, { useEffect, useState } from 'react';
import bgimage from './../assets/home.jpg';
import {useHistory} from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    const [query, setQuery] = useState('');

    useEffect(() => {
        document.title = 'InterviewPrep.net';
    }, [])

    function searchQuestions(e) {
        e.preventDefault();
        if(query === '') return;
        let searchString = query.split(' ').join('-');
        searchString = searchString.replace('?', '');
        history.push('/search/'+searchString+'/1');
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center' style={{height:'100vh', backgroundImage:`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${bgimage})`, backgroundSize:'cover'}}> 
            <h1 className='h1 mb-0 p-3 fw-bold' style={{color:'white'}}>InterviewPrep.net</h1>
            <h2 className='h2 p-3 mx-3' style={{color:'white'}}>Ask Interview Questions, Look at Video Responses, Give and Receive Feedback</h2>
            <form className='w-50 mt-5' onSubmit={searchQuestions}>
            <div className="mb-1 d-flex">
                <input type="string" className="form-control w-100" id="searchquery" onChange={e => setQuery(e.target.value)}/>
            <button type="submit" className="btn btn-primary">Search</button>
            </div>
            </form>
        </div>
    )
}

export default Home;