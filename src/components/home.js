import React from 'react';
import './../assets/styles/style.css'; 
import bgimage from './../assets/home.jpg';
const Home = () => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center' style={{height:'90vh'}}> 
            <h1>InterviewPrep.net</h1>
            <h2>Ask Interview Questions, Look at Video Responses, Give and Receive Feedback</h2>
            <form className='w-50 mt-5'>
            <div className="mb-1 d-flex">
                <input type="string" className="form-control w-100" id="searchquery" aria-describedby="questionSearch"/>
            <button type="submit" className="btn btn-primary">Search</button>
            </div>
            </form>
        </div>
    )
}

export default Home;