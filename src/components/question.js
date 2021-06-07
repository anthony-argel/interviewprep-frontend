import React, { useEffect, useState } from 'react';
import {useParams, Link} from 'react-router-dom';
import {FaRegThumbsUp, FaRegThumbsDown} from 'react-icons/fa';

const Question = (props) => {
    const {qid} = useParams();
    const [questiondata, setQuestionData] = useState();
    const [questionrating, setQuestionRating] = useState(0);
    const [videos, setVideos] = useState([]);
    const [yturl, setYTURL] = useState('');
    const [reload, setReload] = useState(false);
    const [userRating, setUserRating] = useState(null);
    
    useEffect(() => {
        if(props.apiURL === '') return;
        if(qid === '') return;
        fetch(props.apiURL+'/question/'+qid+'/userid?query='+localStorage.getItem('id'), {
            method: 'GET',
            mode: 'cors'
        }).then(res => res.json())
        .then(res => {
            if(typeof res !== 'undefined') {
                setVideos(res.videos);
                setQuestionData(res.question);
                setUserRating(res.userrating);
            }
        });

        fetch(props.apiURL+'/questionrating/'+qid, {
          method:'GET',
          mode: 'cors'
        }).then(res => res.json())
        .then(res => {
          if(typeof res !== 'undefined') {
            setQuestionRating(res.rating);
          }
        })

        }, [props.apiURL, qid, reload])

    function addVideo(e) {
        e.preventDefault();
        if(props.apiURL === '') return;
        fetch(props.apiURL+'/video/'+qid, {
            method:'POST',
            mode:'cors',
            headers: {'Content-Type':'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')},
            body: JSON.stringify({youtubeurl: yturl, userid:localStorage.getItem('id')})
        }).then(res => setReload(!reload))
    }

    function submitVote(e, rating) {
      e.preventDefault();
      if(userRating !== null) {
        fetch(props.apiURL+'/questionrating/'+userRating._id, {
            method:'DELETE',
            mode:'cors',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')},
            body: JSON.stringify({rating: userRating.rating, questionid:qid})
        }).then(res => {return;})
        .then( 
          res =>
          fetch(props.apiURL+'/questionrating/', {
              method:'POST',
              mode:'cors',
              headers: {'Content-Type':'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')},
              body: JSON.stringify({questionid:qid, rating:rating})
          }).then(res => setReload(!reload))
        )
      }
      else {
        fetch(props.apiURL+'/questionrating/', {
            method:'POST',
            mode:'cors',
            headers: {'Content-Type':'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')},
            body: JSON.stringify({questionid:qid, rating:rating})
        }).then(res => setReload(!reload))
      }
    }

    function deleteVote(e, ratingid, rating) {
      e.preventDefault();
      fetch(props.apiURL+'/questionrating/'+ratingid, {
          method:'DELETE',
          mode:'cors',
          headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')},
          body: JSON.stringify({rating: rating, questionid:qid})
      }).then(res => setReload(!reload))
    }

    return (
    <div className='container'>
        <div className='row justify-content-center'>
            <div className='col-12 col-lg-10'>
                <div>
                    {typeof questiondata !== 'undefined' ? 
                    <h1 className='m-0'>{questiondata.text}</h1>
                :
                "loading..."}</div>
                
                <div className='d-flex'>
                  {userRating !== null && userRating.rating === 1 ? 
                  <FaRegThumbsUp size='2em' cursor='pointer' color='green' onClick={e => deleteVote(e, userRating._id, userRating.rating)}/>
                  :
                  <FaRegThumbsUp size='2em' cursor='pointer' onClick={e => {submitVote(e, 1)}}/>
                  }
                  {typeof questionrating !== 'undefined' ? <p className='m-0 mx-3 fs-3'>{questionrating}</p> : 0}
                  {userRating !== null && userRating.rating === -1 ? 
                  <FaRegThumbsDown size='2em' cursor='pointer' color='green' onClick={e => deleteVote(e, userRating._id, userRating.rating)}/>
                  :
                  <FaRegThumbsDown size='2em' cursor='pointer' onClick={e => submitVote(e, -1)}/>
                  }
                </div>
              <div className='text-center'>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#youtubemodal">
                  Add Response
                </button>
              </div>
                <hr/>
                
                <div className='row justify-space-between'>
                    {videos.length > 0 
                    ? 
                    videos.map((val, ind) => {
                        return <div key={val._id} className='col-12 col-lg-3 p-3 mt-5'>
                        <Link to={'/video/'+val._id}>
                        <img src={`https://img.youtube.com/vi/${val.youtubeurl}/0.jpg`} className='w-100 h-auto'/>
                        </Link>
                        <hr className='m-0'/>
                        <p className='mb-0'>Submitted by: {val.poster.username}</p>
                        <p className='mb-0'>comments: {val.commentcount}</p>
                        <p>rating: {val.rating}</p>
                        </div>
                    })
                    :
                    <p>No videos uploaded</p>}
                </div>
                
            </div>
        </div>





<div className="modal fade" id="youtubemodal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="youtubemodalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="youtubemodalLabel">Add Video</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={addVideo}>
        <label htmlFor="basic-url" className="form-label">Video Link:</label>
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon3">https://www.youtube.com/watch?v=</span>
            <input type="text" className="form-control" id="basic-url" value={yturl} onChange={e => setYTURL(e.target.value)} aria-describedby="basic-addon3"/>
          </div>
          <button type='submit' className='btn btn-primary'>Submit</button>
       
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>




    </div>
    )
}

export default Question;