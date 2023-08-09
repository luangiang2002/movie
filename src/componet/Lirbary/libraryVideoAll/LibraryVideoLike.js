import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
const LibraryVideoLike = ({sortedWatchedLike,handleShowAll}) => {
    const navigate = useNavigate()
    const handleVideoClick = (video) => {
        navigate(`/videoapp/${video.videoId}`)
    }
    const hadleYoutube = (video) => {
        navigate(`/homevideo/${video.videoId}`)
    }
    const handleVideoAll = () => {
        navigate('/likeall/')
    }
  return (
    <div className='library'>
    <div className="library_title">
        <div className='library_title--icon'>
            <AiOutlineClockCircle />
            <p>Video đã Like</p>
        </div>
        <div className='library_title--p'>
            <p onClick={handleVideoAll}>Xem tất cả</p>
        </div>
    </div>
    <div className="library_list">
        {sortedWatchedLike.length > 0 ? (
            sortedWatchedLike.map((video, i) => (
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
                            <h4>{video.title}</h4>
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

export default LibraryVideoLike