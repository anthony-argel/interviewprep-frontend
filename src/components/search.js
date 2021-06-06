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
        fetch(props.apiURL + '/question/'+page+'/search?query='+searchQuery, {
            method:'GET',
            mode:'cors'
        }).then(res => res.json())
        .then(res => {
            if(typeof res === 'undefined') return;

            setTotalResults(res.total);
            setResults(res.results);
        })
    }, [props.apiURL])

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-12 col-lg-8 shadow-lg p-2'>
                    {results.length > 0 ?
                        <div>
                            <h1>Searched for '{searchedText}'</h1>
                            <p>Results found: {totalResults}</p>
                            <hr/>
                            {results.map((question) => {
                                return <div key={question._id}><Link to={'/question/'+question._id}>{question.text}</Link></div>
                            })}
                        </div>
                    :
                    <div>No matches found</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Search;