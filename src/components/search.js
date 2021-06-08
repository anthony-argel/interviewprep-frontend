import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Search = (props) => {
    const {query, page} = useParams();
    const [results, setResults] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [searchedText, setSearchedText] = useState('');
    useEffect(() => {
        if(props.apiURL === '') return;
        const searchQuery = query.split('-').join(' ');
        setSearchedText(searchQuery);
        document.title = "Search: " + searchQuery + " | InterviewPrep.net";
        fetch(props.apiURL + '/question/'+page+'/search?query='+searchQuery, {
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
    }, [props.apiURL, query])

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-12 col-lg-8 shadow-lg p-4'>
                    {results.length > 0 ?
                        <div>
                            <h1>Searched for '{searchedText}'</h1>
                            <p>Results found: {totalResults}</p>
                            <hr/>
                            {results.map((question, index) => {
                                return <div key={question._id} className='d-flex'>
                                    <div className='text-center'>Rating:<br/>{question.rating}</div>
                                    <div className='mx-3'>
                                        <Link to={'/question/'+question._id}>{question.text}</Link>
                                        <p>Videos: {question.videocount}</p>
                                        {index +1 !== results.length ? <hr/> : null}
                                    </div>
                                </div>
                            })}
                        </div>
                    :
                    <div>No matches found for {query.split('-').join(' ')}</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Search;