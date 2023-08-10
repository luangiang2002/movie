import React from 'react';
import './search.scss';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { gethandleVideoClick } from '../../GetAddWatches';

const SearchApp = ({ firestoreResults }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { firebaseId } = useSelector((state) => state.imageAvatar);
    const handleVideoClick = async (video) => {
        await gethandleVideoClick(video, firebaseId, dispatch);
        navigate(`/videoapp/${video.videoId}`);
    };
    const handchanle = (channelID) => {
        navigate(`/channelapp/${channelID}`);
    };

    return (
        <>
            <div className=" search">
                {firestoreResults &&
                    firestoreResults.map((videoData, i) => (
                        <div className="search_video" key={i}>
                            <div className="search_video--duration" onClick={() => handleVideoClick(videoData)}>
                                <img src={videoData.thumbnailsurl} alt="" className="search_video--duration_img" />
                            </div>
                            <div className="search_video--detail d-flex w-100">
                                <div className="search_content">
                                    <h4 className="search_title" onClick={() => handleVideoClick(videoData)}>
                                        {videoData.title}
                                    </h4>
                                    <p className="author" onClick={() => handchanle(videoData.firebaseID)}>
                                        {videoData.channelTitle}
                                    </p>
                                    <p className="search_sub">{moment(videoData.timestamp).fromNow()} </p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default SearchApp;
