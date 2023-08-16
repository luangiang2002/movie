import React from 'react';
import moment from 'moment';
const VideoAll = ({ videov, handleVideoClickv, hadleYoutubev }) => {
    const sortedWatchedVideos = videov.watchedVideos.sort((a, b) => {
        const dateA = new Date(a.watchedAt);
        const dateB = new Date(b.watchedAt);
        return dateB - dateA;
    });
    return (
        <div className="library">
            <div className="library_list">
                {sortedWatchedVideos.length > 0 ? (
                    sortedWatchedVideos.map((video, i) => (
                        <div className="library_video" key={i}>
                            {video.content === 'youtubeApi' ? (
                                <div className="library_video--duration" onClick={() => hadleYoutubev(video)}>
                                    <img src={video.thumbnail} alt="" />
                                </div>
                            ) : (
                                <div className="library_video--duration" onClick={() => handleVideoClickv(video)}>
                                    <img src={video.thumbnail} alt="" />
                                </div>
                            )}

                            <div className="library_video--detail d-flex w-100">
                                <div className="library_video--detail_title">
                                    <h4 onClick={() => handleVideoClickv(video)}>{video.title}</h4>
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

export default VideoAll;
