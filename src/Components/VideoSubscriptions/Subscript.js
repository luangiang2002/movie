import React, { useEffect } from 'react';
import './Subcript.scss';
import { getSubscriptVideosForUser } from '../../redux/action/libraryAction';
import { useNavigate } from 'react-router';
const Subscript = ({ videosb, firebaseId, dispatch }) => {
    const sortedWatchedsub = videosb.subripts.sort((a, b) => {
        const dateA = new Date(a.watchedAt);
        const dateB = new Date(b.watchedAt);
        return dateB - dateA;
    });
    useEffect(() => {
        dispatch(getSubscriptVideosForUser(firebaseId));
    }, [dispatch, firebaseId]);
    const navigate = useNavigate();
    const handleChannelApp = (id) => {
        navigate(`/channelapp/${id}`);
    };
    const handleChannelYoutube = (id) => {
        navigate(`/channel/${id}`);
    };
    return (
        <div className="Subcript">
            <p>Những kênh đã đăng kí</p>
            <div className="Subcript_list">
                {!videosb.loading && sortedWatchedsub.length > 0 ? (
                    sortedWatchedsub.map((video, i) => (
                        <div className="Subcript_video" key={i}>
                            {video.content !== 'youtube' ? (
                                <img
                                    src={video.channelAvatar}
                                    alt=""
                                    className="Subcript_img"
                                    onClick={() => handleChannelApp(video.channelId)}
                                />
                            ) : (
                                <img
                                    src={video.channelAvatar}
                                    alt=""
                                    className="Subcript_img"
                                    onClick={() => handleChannelYoutube(video.channelId)}
                                />
                            )}

                            <div className="Subcript_title">
                                <div>
                                    {video.content !== 'youtube' ? (
                                        <h6 onClick={() => handleChannelApp(video.channelId)}>{video.channelTitle}</h6>
                                    ) : (
                                        <h6 onClick={() => handleChannelYoutube(video.channelId)}>
                                            {video.channelTitle}
                                        </h6>
                                    )}
                                    <p>{video.subscribersCount} người đăng kí</p>
                                    <p>{video.channelDescription}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Bạn chưa đăng kí kênh nào </div>
                )}
            </div>
        </div>
    );
};

export default Subscript;
