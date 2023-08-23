import React from 'react';
import moment from 'moment';
const DisLikeAll = ({ videos, handleVideoClicks, hadleYoutubes }) => {
    const sortedWatchedDislike = videos.DislikeVideos.sort((a, b) => {
        const dateA = new Date(a.watchedAt);
        const dateB = new Date(b.watchedAt);
        return dateB - dateA;
    });
    return (
        <div className="library">
            <p>Những video không thích</p>
            <div className="library_list">
                {sortedWatchedDislike.length > 0 ? (
                    sortedWatchedDislike.map((video, i) => (
                        <div className="library_video" key={i}>
                            {video.content === 'youtubeApi' ? (
                                <div className="library_video--duration" onClick={() => hadleYoutubes(video)}>
                                    <img src={video.thumbnail} alt="" />
                                </div>
                            ) : (
                                <div className="library_video--duration" onClick={() => handleVideoClicks(video)}>
                                    <img src={video.thumbnail} alt="" />
                                </div>
                            )}

                            <div className="library_video--detail d-flex w-100">
                                <div className="library_video--detail_title">
                                    <h4 onClick={() => handleVideoClicks(video)}>{video.title}</h4>
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

export default DisLikeAll;
