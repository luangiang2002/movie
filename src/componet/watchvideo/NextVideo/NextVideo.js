import React from 'react'
import './nextvideo.scss'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
const NextVideo = ({ videos }) => {
    const navigate = useNavigate()
    const channeId = videos?.snippet?.channelId
    const VideoId = videos?.id?.videoId
    const handleVideoClick = () => {
        navigate(`/homevideo/${VideoId}`)
    }
    const handleChannel = () => {
        navigate(`/channel/${channeId}`)

    }
    return (
        <div className=' nextvideo' >
            <div className="nextvideo_video" >
                <div className="nextvideo_video--duration" onClick={handleVideoClick}>
                    <img src={videos?.snippet?.thumbnails?.medium?.url} alt='' />
                </div>
                <div className="nextvideo_video--detail d-flex w-100">
                    <div className="nextvideo_content">
                        <h4 className='nextvideo_title' onClick={handleVideoClick}>{videos?.snippet?.title}</h4>
                        <p className="author" onClick={handleChannel}>{videos?.snippet?.channelTitle}</p>
                        <p className="nextvideo_sub">{moment(videos?.snippet?.publishedAt).fromNow()} </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NextVideo