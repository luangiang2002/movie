import React from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import moment from 'moment';
import NotFoundVideo from '../../NotFoundVideo/NotFoundVideo';
const LibraryList = ({ videos, title, toggleAll, handleVideoAppClick, handleVideoYTbClick }) => {
    return (
        <div className="library">
            <div className="library_title">
                <div className="library_title--icon">
                    <AiOutlineClockCircle />
                    <p>{title}</p>
                </div>
                <div className="library_title--p">
                    <button disabled={videos.length === 0} onClick={toggleAll}>
                        Xem tất cả
                    </button>
                </div>
            </div>
            {videos.length > 0 ? (
                <div className="library_list">
                    {videos.map((video, i) => (
                        <div className="library_video" key={i}>
                            {video.content === 'youtubeApi' ? (
                                <div className="library_video--duration" onClick={() => handleVideoYTbClick(video)}>
                                    <img src={video.thumbnail} alt="" />
                                </div>
                            ) : (
                                <div className="library_video--duration" onClick={() => handleVideoAppClick(video)}>
                                    <img src={video.thumbnail} alt="" />
                                </div>
                            )}

                            <div className="library_video--detail d-flex w-100">
                                <div className="library_video--detail_title">
                                    <h4>{video.title}</h4>
                                    <p className="library_video--detail_author">{video.channelTitle}</p>
                                    <p className="library_video--detail_sub">
                                        Đã xem: {moment(video.watchedAt).fromNow()}{' '}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <NotFoundVideo />
            )}
        </div>
    );
};

export default LibraryList;
