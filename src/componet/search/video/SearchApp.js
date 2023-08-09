import React from 'react'
import './search.scss'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addDoc, collection } from 'firebase/firestore'
import { getLibrary } from '../../../redux/action/libraryAction'
import { db } from '../../../firebase/fibefire'

const SearchApp = ({ firestoreResults }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  

    const {firebaseId}=useSelector(state=>state.imageAvatar)
    const handleVideoClick = async (video) => {
        const currentDate = new Date();
        const currentTime = currentDate.toISOString();
        try {
            const videoData = {
              videoId: video.videoId,
              channelTitle:video.channelTitle,
              watchedAt:currentTime,
              thumbnail:video.thumbnailsurl,
              title:video.title,
              channelAvatar:video.channelAvatar,
              firebaseID:firebaseId,
              like:0,
              dislike:0,
            };
            const watchedVideosRef = collection(db, 'watchedVideos');
            dispatch(getLibrary(videoData));
            await addDoc(watchedVideosRef, videoData);
          } catch (error) {
            console.error('Error adding watched video: ', error);
          }
        navigate(`/videoapp/${video.videoId}`)
    }
    const handchanle=(channelID)=>{
        navigate(`/channelapp/${channelID}`)
    }
   
    return (

        <>
            <div className=' search' >
                {
                    firestoreResults && firestoreResults.map((videoData) => (
                        <div className="search_video" >
                            <div className="search_video--duration" onClick={() => handleVideoClick(videoData)}>
                                <img src={videoData.thumbnailsurl} alt='' className='search_video--duration_img'/>
                            </div>
                            <div className="search_video--detail d-flex w-100">
                                <div className="search_content">
                                    <h4 className='search_title' onClick={() => handleVideoClick(videoData)}>{videoData.title}</h4>
                                    <p className="author"  onClick={()=>handchanle(videoData.firebaseID)}>{videoData.channelTitle}</p>
                                    <p className="search_sub">{moment(videoData.timestamp).fromNow()} </p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default SearchApp