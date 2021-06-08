import React, { useEffect, useState } from 'react';
import './../assets/styles/style.css'; 
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
        <div className='d-flex flex-column justify-content-center align-items-center' style={{height:'90vh'}}> 
            <h1 className='h1'>InterviewPrep.net</h1>
            <h2 className='h2 mt-3 px-3'>Ask Interview Questions, Look at Video Responses, Give and Receive Feedback</h2>
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