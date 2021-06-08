import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import {FaRegThumbsUp, FaRegThumbsDown} from 'react-icons/fa';
import {MdClose} from 'react-icons/md';

const Video = (props) => {
    const {id} = useParams();
    const [videodata, setVideoData] = useState();
    const [userRating, setUserRating] = useState(null);
    const [videorating, setVideoRating] = useState();
    const [comments, setComments] = useState([]);
    const [reload, setReload] = useState(false);
    const [reloadComments, setReloadComments] = useState(false);
    const [feedback, setFeedback] = useState('');


    useEffect(() => {
        if(props.apiURL === '') return;

        fetch(props.apiURL+'/video/'+id, {
            method:'GET',
            mode:'cors'
        }).then(res => res.json())
        .then(res => {
            if(typeof res !== 'undefined') {
                setVideoData(res.video);
            }
        });

        fetch(props.apiURL+'/videorating/'+id, {
            method:'GET',
            mode:'cors'
        }).then(res => res.json())
        .then(res => {
            if(typeof res !== 'undefined') {
                setVideoRating(res.rating);
            }
        });

        fetch(props.apiURL+'/videorating/user/'+id+'/'+localStorage.getItem('id'), {
            method:'GET',
            mode:'cors'
        }).then(res => res.json())
        .then(res => {
            if(typeof res !== 'undefined') {
                setUserRating(res.result);
            }
        })
    }, [props.apiURL, reload]);

    function submitVote(e, rating) {
        e.preventDefault();
        if(props.apiURL === '') return;
        if(props.loggedIn === '') return;
        if(userRating !== null) {
          fetch(props.apiURL+'/videorating/'+userRating._id, {
              method:'DELETE',
              mode:'cors',
              headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')},
              body: JSON.stringify({rating: userRating.rating, video:id})
          }).then(res => {return;})
          .then( 
            res =>
            fetch(props.apiURL+'/videorating/', {
                method:'POST',
                mode:'cors',
                headers: {'Content-Type':'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')},
                body: JSON.stringify({videoid:id, rating:rating})
            }).then(res => setReload(!reload))
          )
        }
        else {
          fetch(props.apiURL+'/videorating/', {
              method:'POST',
              mode:'cors',
              headers: {'Content-Type':'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')},
              body: JSON.stringify({videoid:id, rating:rating})
          }).then(res => setReload(!reload))
        }
    }

    function deleteVote(e, ratingid, rating) {
      e.preventDefault();
      if(props.apiURL === '') return;
      if(props.loggedIn === '') return;
      fetch(props.apiURL+'/videorating/'+ratingid, {
          method:'DELETE',
          mode:'cors',
          headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')},
          body: JSON.stringify({rating: rating, videoid:id})
      }).then(res => setReload(!reload))
    }

    function sendFeedback(e) {
        e.preventDefault();
        if(props.apiURL === '') return;
        if(props.loggedIn === '') return;
        if(feedback === '') return;

        fetch(props.apiURL+'/comment', {
            method:'POST',
            mode:'cors',
            headers: {'Content-Type':'application/json', 'Authorization':'Bearer ' + localStorage.getItem('token')},
            body: JSON.stringify({video: id, text: feedback})
        }).then(res => setReloadComments(!reloadComments))
    }

    function deleteComment(commentid) {
        if(props.apiURL === '') return;
        fetch(props.apiURL+'/comment/'+commentid, {
            method:'DELETE',
            mode:'cors',
            headers: {'Content-Type':'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')},
            body: JSON.stringify({videoid: id})
        }).then(res => setReloadComments(!reloadComments))
    }

    useEffect(() => {
        if(props.apiURL === '') return;
        fetch(props.apiURL+'/comment/'+id, {
            method:'GET',
            mode:'cors'
        }).then(res => res.json())
        .then(res => {
            if(typeof res !== 'undefined') {
                setComments(res.comments);
            }
        });

        if(props.id === null) {
            setUserRating(null);
        }

    }, [props.apiURL, reloadComments, props.loggedIn, props.id])

    

    
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-lg-5'>
                {typeof videodata !== 'undefined' ?
                <iframe width="100%" height="auto" style={{minHeight:'50vh'}} src={"https://www.youtube.com/embed/"+videodata.youtubeurl} title="YouTube video player" frameBorder="0" allow="accelerometer; fullscreen;" allowFullScreen></iframe>
               :
                null    
                }
                </div>

                <div className='col-12 col-lg-7'>
                    <h1>{typeof videodata !== 'undefined' ? videodata.question.text : null}</h1>
                    <hr/>
                    <h2>Submitted by: {typeof videodata !== 'undefined' ? videodata.poster.username : null}</h2>
                    <div className='d-flex'>
                        {userRating !== null && userRating.rating === 1 ? 
                        <FaRegThumbsUp size='2em' cursor='pointer' color='green' onClick={e => deleteVote(e, userRating._id, userRating.rating)}/>
                        :
                        <FaRegThumbsUp size='2em' cursor='pointer' onClick={e => {submitVote(e, 1)}}/>
                        }
                        {typeof videorating !== 'undefined' ? <p className='mx-3 fs-3'>{videorating}</p> : 0}
                        {userRating !== null && userRating.rating === -1 ? 
                        <FaRegThumbsDown size='2em' cursor='pointer' color='green' onClick={e => deleteVote(e, userRating._id, userRating.rating)}/>
                        :
                        <FaRegThumbsDown size='2em' cursor='pointer' onClick={e => submitVote(e, -1)}/>
                        }
                    </div>
                    {typeof videodata !== 'undefined' && videodata.poster._id === props.id ? 
                    <p style={{cursor:'pointer', color:'blue', textDecoration:'underline'}} className='mt-5'>Delete Video</p>
                : null}
                </div>
            </div>

            <div className='row mb-3'>
                <div className='col-12 col-lg-12'>
                    {
                        props.loggedIn ? 
                        <div>
                            <hr/>
                            <form onSubmit={sendFeedback}>
                                    <label htmlFor="feedbackArea" className="form-label">Feedback</label>
                                    <textarea className="form-control" id="feedbackArea" value={feedback} onChange={e => setFeedback(e.target.value)} rows="4"></textarea>
                              
                                <button type="submit" className="btn btn-primary mt-3">Post</button>
                            </form>
                        </div>
                        :
                        null
                    }
                    <hr/>
                    <h3 className='text-center h3'>Feedback</h3>
                    {comments.length <= 0 ? <p>No feedback. </p> : 
                    comments.map((val) => {
                        return (
                            <div key={val._id} className='mb-5'>
                                <p className='mb-0 h2 fw-bold'>{val.poster.username}
                                <span>{val.poster._id === props.id ? <MdClose color='red' cursor='pointer' onClick={() => deleteComment(val._id)}/> : null}</span>
                                </p>
                                <p className='fs-5' style={{whiteSpace:'pre-wrap'}}>{val.text}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Video;