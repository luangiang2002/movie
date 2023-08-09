import React from 'react'
import './search.scss'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addDoc, collection } from 'firebase/firestore'
import { getLibrary } from '../../../redux/action/libraryAction'
import { db } from '../../../firebase/fibefire'

const Search = ({ video}) => {
    const navigate = useNavigate()
    const channeId = video?.snippet?.channelId
    const VideoId = video?.id?.videoId

    const { firebaseId } = useSelector(state => state.imageAvatar)
    const dispatch = useDispatch();

    const handleVideoClick = async () => {
        const currentDate = new Date();
        const currentTime = currentDate.toISOString();
        try {
            const videoData = {
                videoId: video.id.videoId,
                channelTitle: video.snippet.channelTitle,
                watchedAt: currentTime,
                thumbnail: video.snippet.thumbnails.default.url,
                title: video.snippet.title,
                firebaseID: firebaseId,
                channelId: video.snippet.channelId,
                like: 0,
                dislike: 0,
                subscript: '',
                content: 'youtubeApi'
            };
            const watchedVideosRef = collection(db, 'watchedVideos');
            dispatch(getLibrary(videoData));
            await addDoc(watchedVideosRef, videoData);

        } catch (error) {
            console.error('Error adding watched video: ', error);
        }
        navigate(`/homevideo/${VideoId}`)
    }
    const handleChannel = () => {
        navigate(`/channel/${channeId}`)

    }
    return (
        <div className=' search' >        
            <div className="search_video" >
                <div className="search_video--duration" onClick={handleVideoClick}>
                    <img src={video?.snippet?.thumbnails?.medium?.url} alt='' />
                </div>
                <div className="search_video--detail d-flex w-100">
                    <div className="search_content">
                        <h4 className='search_title' onClick={handleVideoClick}>{video?.snippet?.title}</h4>
                        <p className="author" onClick={handleChannel}>{video?.snippet?.channelTitle}</p>
                        <p className="search_sub">{moment(video?.snippet?.publishedAt).fromNow()} </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search