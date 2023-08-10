import React from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import moment from 'moment';
const LibraryList = ({ videos, title, toggleAll, handleVideoAppClick, handleVideoYTbClick }) => {
    return (
        <div className="library">
            <div className="library_title">
                <div className="library_title--icon">
                    <AiOutlineClockCircle />
                    <p>{title}</p>
                </div>
                <div className="library_title--p">
                    <p onClick={toggleAll}>Xem tất cả</p>
                </div>
            </div>
            <div className="library_list">
                {videos.length > 0 ? (
                    videos.map((video, i) => (
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
                                        đã xem : {moment(video.watchedAt).fromNow()}{' '}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Bạn chưa xem video </div>
                )}
            </div>
        </div>
    );
};

export default LibraryList;
