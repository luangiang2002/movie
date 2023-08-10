import React, { useEffect } from 'react';
import './homeapp.scss';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { GetVideoData } from './videoApp/GetData';
import { videoUpload } from '../../../redux/action/VideoActionApp';
import { gethandleVideoClick } from '../../GetAddWatches';
const HomeApp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { videos, loading } = useSelector((state) => state.videosapp);
    const sortedVideos = videos.slice().sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return dateB - dateA;
    });
    const { firebaseId } = useSelector((state) => state.imageAvatar);

    const handleVideoClick = async (video) => {
        await gethandleVideoClick(video, firebaseId, dispatch);
        navigate(`/videoapp/${video.videoId}`);
    };
    const handchanle = (channelID) => {
        navigate(`/channelapp/${channelID}`);
    };

    useEffect(() => {
        const fetchComments = async () => {
            const videos = await GetVideoData();
            dispatch(videoUpload(videos));
        };
        fetchComments();
    }, [dispatch]);
    return (
        <div className=" homeapp">
            {!loading &&
                videos &&
                sortedVideos.map((video, i) => (
                    <div className="homeapp_video" key={i}>
                        <div className="homeapp_video--duration" onClick={() => handleVideoClick(video)}>
                            <img src={video.thumbnailsurl} alt="" />
                        </div>
                        <div className="homeapp_video--detail d-flex w-100">
                            <div className="homeapp_video--detail_channel">
                                <img src={video.channelAvatar} alt="" />
                            </div>
                            <div className="homeapp_video--detail_title">
                                <h4 onClick={handleVideoClick}>{video.title}</h4>
                                <p
                                    className="homeapp_video--detail_author"
                                    onClick={() => handchanle(video.firebaseID)}
                                >
                                    {video.channelTitle}
                                </p>
                                <p className="homeapp_video--detail_sub">{moment(video.timestamp).fromNow()} </p>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default HomeApp;
