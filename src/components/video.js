import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import {FaRegThumbsUp, FaRegThumbsDown} from 'react-icons/fa';

const Video = (props) => {
    const {id} = useParams();
    const [videodata, setVideoData] = useState();
    const [userRating, setUserRating] = useState();
    const [videorating, setVideoRating] = useState();


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
        })
    }, [props.apiURL])

    
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                {typeof videodata !== 'undefined' ?
                <div>
                <iframe width="512px" height="auto" style={{minHeight:'50vh'}} src={"https://www.youtube.com/embed/"+videodata.youtubeurl} title="YouTube video player" frameborder="0" allow="accelerometer; fullscreen;" allowfullscreen></iframe>
                <p>Posted by {videodata.poster.username}</p>
                
                <div className='d-flex'>
                  {videorating !== null && videorating.rating === 1 ? 
                  <FaRegThumbsUp size='2em' cursor='pointer' color='green' />
                  :
                  <FaRegThumbsUp size='2em' cursor='pointer'/>
                  }
                  {typeof videorating !== 'undefined' ? <p className='m-0 mx-3 fs-3'>{videorating.rating}</p> : 0}
                  {videorating !== null && videorating.rating === -1 ? 
                  <FaRegThumbsDown size='2em' cursor='pointer' color='green'/>
                  :
                  <FaRegThumbsDown size='2em' cursor='pointer'/>
                  }
                </div>
                </div>:
                null    
                }
                </div>
            </div>
        </div>
    )
}

export default Video;