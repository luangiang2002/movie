import React from 'react';
import './PageVideo.scss';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getYoutubeClick } from '../GetAddWatches';
const PageVideo = ({ video }) => {
    const { firebaseId } = useSelector((state) => state.imageAvatar);
    const navigate = useNavigate();
    const channelId = video?.snippet?.channelId;
    const VideoId = video?.id?.videoId;
    const dispatch = useDispatch();
    const handleVideoClick = async (video) => {
        await getYoutubeClick(video, firebaseId, dispatch);
        navigate(`/homevideo/${VideoId}`);
    };
    const handleChannel = () => {
        navigate(`/channel/${channelId}`);
    };

    return (
        <div className=" pagevideo">
            <div className="pagevideo_video">
                <div className="pagevideo_video--duration" onClick={() => handleVideoClick(video)}>
                    <img src={video?.snippet?.thumbnails?.medium?.url} alt="" />
                </div>
                <div className="pagevideo_video--detail d-flex w-100">
                    <div className="pagevideo_content">
                        <h4 className="pagevideo_title" onClick={() => handleVideoClick(video)}>
                            {video?.snippet?.title}
                        </h4>
                        <p className="author" onClick={handleChannel}>
                            {video?.snippet?.channelTitle}
                        </p>
                        <p className="pagevideo_sub">{moment(video?.snippet?.publishedAt).fromNow()} </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageVideo;
