import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { getWatchedVideosForUser } from '../../../redux/action/libraryAction';
const VideoAll = () => {
    const { firebaseId } = useSelector(state => state.imageAvatar)
    const { watchedVideos } = useSelector(state => state.library)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getWatchedVideosForUser(firebaseId));
    }, [dispatch, firebaseId]);
    const navigate = useNavigate()
    const handleVideoClick = (video) => {
        navigate(`/videoapp/${video.videoId}`)
    }
    const hadleYoutube = (video) => {
        navigate(`/homevideo/${video.videoId}`)
    }
    const sortedWatchedVideos = watchedVideos.sort((a, b) => {
        const dateA = new Date(a.watchedAt);
        const dateB = new Date(b.watchedAt);
        return dateB - dateA;
    });
    return (
        <div className='library'>
            <div className="library_list">
                {sortedWatchedVideos.length > 0 ? (
                    sortedWatchedVideos.map((video, i) => (
                        <div className="library_video" key={i}>
                            {
                                video.content === 'youtubeApi' ? (
                                    <div className="library_video--duration" onClick={() => hadleYoutube(video)}>
                                        <img src={video.thumbnail} alt='' />
                                    </div>
                                ) : (
                                    <div className="library_video--duration" onClick={() => handleVideoClick(video)}>
                                        <img src={video.thumbnail} alt='' />
                                    </div>
                                )
                            }

                            <div className="library_video--detail d-flex w-100">
                                <div className='library_video--detail_title'>
                                    <h4 onClick={handleVideoClick}>{video.title}</h4>
                                    <p className="library_video--detail_author">{video.channelTitle}</p>
                                    <p className="library_video--detail_sub">đã xem : {moment(video.watchedAt).fromNow()} </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Bạn chưa xem video </div>
                )}
            </div>
        </div>
    )
}

export default VideoAll