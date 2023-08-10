import React from 'react';
import './subcript.scss';
import moment from 'moment';
const Subscript = ({ videosb, handleVideoClicksb, hadleYoutubesb }) => {
    const sortedWatchedsub = videosb.subripts.sort((a, b) => {
        const dateA = new Date(a.watchedAt);
        const dateB = new Date(b.watchedAt);
        return dateB - dateA;
    });
    return (
        <div className="library">
            <div className="library_list">
                {!videosb.loading && sortedWatchedsub.length > 0 ? (
                    sortedWatchedsub.map((video, i) => (
                        <div className="library_video" key={i}>
                            {video.content === 'youtubeApi' ? (
                                <div className="library_video--duration" onClick={() => hadleYoutubesb(video)}>
                                    <img src={video.thumbnail} alt="" />
                                </div>
                            ) : (
                                <div className="library_video--duration" onClick={() => handleVideoClicksb(video)}>
                                    <img src={video.thumbnail} alt="" />
                                </div>
                            )}

                            <div className="library_video--detail d-flex w-100">
                                <div className="library_video--detail_title">
                                    <h4 onClick={() => hadleYoutubesb(video)}>{video.title}</h4>
                                    <p className="library_video--detail_author">{video.channelTitle}</p>
                                    <p className="library_video--detail_sub">
                                        đã like : {moment(video.watchedAt).fromNow()}{' '}
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

export default Subscript;
