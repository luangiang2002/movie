import React, { useEffect } from 'react';
import './channelapp.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoUploadUser } from '../../../redux/action/libraryAction';
import moment from 'moment';
import { gethandleVideoClick } from '../../GetAddWatches';
const ChannelApp = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { video, loading } = useSelector((state) => state.library);
    const { firebaseId } = useSelector((state) => state.imageAvatar);
    const handleVideoClick = async (video) => {
        await gethandleVideoClick(video, firebaseId, dispatch);
        navigate(`/videoapp/${video.videoId}`);
    };
    useEffect(() => {
        dispatch(getVideoUploadUser(id));
    }, [dispatch, id]);
    return (
        <>
            {!loading ? (
                <div className="channelApp">
                    <div className="channelApp_banner">
                        <div>
                            <img src={video[0]?.channelAvatar} alt="" />
                            <p>{video[0]?.channelTitle}</p>
                        </div>
                    </div>
                    <div className="channelApp_list">
                        {video &&
                            video.map((video, i) => (
                                <div className="videoupload_video" key={i}>
                                    <div
                                        className="videoupload_video--duration"
                                        onClick={() => handleVideoClick(video)}
                                    >
                                        <img src={video?.thumbnailsurl} alt="" />
                                    </div>
                                    <div className="videoupload_video--detail d-flex w-100">
                                        <div className="videoupload_video--detail_title">
                                            <h4 onClick={handleVideoClick}>{video.title}</h4>
                                            <p className="videoupload_video--detail_author">{video?.channelTitle}</p>
                                            <p className="videoupload_video--detail_sub">
                                                {moment(video?.timestamp).fromNow()}{' '}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            ) : (
                <div>Không có kênh này</div>
            )}
        </>
    );
};

export default ChannelApp;
