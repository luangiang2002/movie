import React, { useEffect } from 'react';
import './Subcript.scss';
import { getSubscriptVideosForUser } from '../../redux/action/libraryAction';
import ShowMoreText from 'react-show-more-text';
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
    function formatNumber(number) {
        if (number >= 1000000000) {
            const billion = (number / 1000000000).toFixed(1);
            return billion.endsWith('.0') ? billion.slice(0, -2) + ' T' : billion + ' T';
        } else if (number >= 1000000) {
            const million = (number / 1000000).toFixed(1);
            return million.endsWith('.0') ? million.slice(0, -2) + ' Tr' : million + ' Tr';
        } else if (number >= 1000) {
            const thousand = (number / 1000).toFixed(1);
            return thousand.endsWith('.0') ? thousand.slice(0, -2) + ' N' : thousand + ' N';
        } else {
            return number.toFixed(0);
        }
    }
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
                                    <p>{formatNumber(video.subscribersCount)} người đăng kí</p>

                                    <ShowMoreText
                                        lines={1}
                                        more="Hiện thêm"
                                        less="Ẩn bớt"
                                        className="content-css"
                                        anchorClass="show-more-less-clickable"
                                        expanded={false}
                                        truncatedEndingComponent={'... '}
                                    >
                                        <p>{video.channelDescription}</p>
                                    </ShowMoreText>
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
