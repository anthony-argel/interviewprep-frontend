import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Browse = (props) => {
    const {page} = useParams();
    const [results, setResults] = useState([]);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        if(props.apiURL === '') return;
        fetch(props.apiURL + '/question/limit/'+page, {
            method:'GET',
            mode:'cors'
        }).then(res => res.json())
        .then(res => {
            if(typeof res === 'undefined') {
                setTotalResults(0);
                setResults([]);
                return;
            }

            setTotalResults(res.total);
            setResults(res.results);
        })
    }, [props.apiURL, page])

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-12 col-lg-8 shadow-lg p-4'>
                    {results.length > 0 ?
                        <div>
                            <h1>Browse</h1>
                            <p>Results found: {totalResults}</p>
                            <hr/>
                            {results.map((question, index) => {
                                return <div key={question._id} className='d-flex'>
                                    <div className='text-center'>Rating:<br/>{question.rating}</div>
                                    <div className='mx-3 w-100'>
                                        <Link to={'/question/'+question._id}>{question.text}</Link>
                                        <p>Videos: {question.videocount}</p>
                                    </div>
                                </div>
                            })}
                        </div>
                    :
                    <div>Loading...</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse;