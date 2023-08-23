import React from 'react';
import moment from 'moment';
const LikeAll = ({ videol, handleVideoClickl, hadleYoutubel }) => {
    const sortedWatchedLike = videol.likedVideos.sort((a, b) => {
        const dateA = new Date(a.watchedAt);
        const dateB = new Date(b.watchedAt);
        return dateB - dateA;
    });
    return (
        <div className="library">
            <p>Những video đã like</p>
            <div className="library_list">
                {sortedWatchedLike.length > 0 ? (
                    sortedWatchedLike.map((video, i) => (
                        <div className="library_video" key={i}>
                            {video.content === 'youtubeApi' ? (
                                <div className="library_video--duration" onClick={() => hadleYoutubel(video)}>
                                    <img src={video.thumbnail} alt="" />
                                </div>
                            ) : (
                                <div className="library_video--duration" onClick={() => handleVideoClickl(video)}>
                                    <img src={video.thumbnail} alt="" />
                                </div>
                            )}

                            <div className="library_video--detail d-flex w-100">
                                <div className="library_video--detail_title">
                                    <h4 onClick={() => handleVideoClickl(video)}>{video.title}</h4>
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

export default LikeAll;
