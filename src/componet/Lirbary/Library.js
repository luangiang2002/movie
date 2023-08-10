import React, { useEffect } from 'react';
import './library.scss';
import { useDispatch, useSelector } from 'react-redux';

import {
    getDisLikeVideosForUser,
    getLikeVideosForUser,
    getWatchedVideosForUser,
} from '../../redux/action/libraryAction';
import { useNavigate } from 'react-router-dom';
import LibraryList from './libraryVideoAll/LibraryList';
const Library = () => {
    const { firebaseId } = useSelector((state) => state.imageAvatar);
    const { watchedVideos, loading } = useSelector((state) => state.library);
    const { likedVideos } = useSelector((state) => state.library);
    const { DislikeVideos } = useSelector((state) => state.library);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getWatchedVideosForUser(firebaseId));
        dispatch(getLikeVideosForUser(firebaseId));
        dispatch(getDisLikeVideosForUser(firebaseId));
    }, [dispatch, firebaseId]);

    const sortedWatchedVideos = watchedVideos.slice(0, 4).sort((a, b) => {
        const dateA = new Date(a.watchedAt);
        const dateB = new Date(b.watchedAt);
        return dateB - dateA;
    });
    const sortedWatchedLike = likedVideos.slice(0, 4).sort((a, b) => {
        const dateA = new Date(a.watchedAt);
        const dateB = new Date(b.watchedAt);
        return dateB - dateA;
    });
    const sortedWatchedDisLike = DislikeVideos.slice(0, 4).sort((a, b) => {
        const dateA = new Date(a.watchedAt);
        const dateB = new Date(b.watchedAt);
        return dateB - dateA;
    });

    const navigate = useNavigate();

    const navigateToVideo = (videoId) => {
        navigate(`/videoapp/${videoId.videoId}`);
    };

    const navigateToYoutube = (videoId) => {
        navigate(`/homevideo/${videoId.videoId}`);
    };

    const navigateVIdeoAll = () => {
        navigate('/videoall/');
    };
    const navigateLikeAll = () => {
        navigate('/likeall/');
    };
    const navigateDisLikwAll = () => {
        navigate('/dislikeall/');
    };

    return (
        <>
            {!loading ? (
                <>
                    <LibraryList
                        videos={sortedWatchedVideos}
                        title="video đã xem"
                        toggleAll={navigateVIdeoAll}
                        handleVideoAppClick={navigateToVideo}
                        handleVideoYTbClick={navigateToYoutube}
                    />
                    <LibraryList
                        videos={sortedWatchedLike}
                        title="video đã thích"
                        toggleAll={navigateLikeAll}
                        handleVideoAppClick={navigateToVideo}
                        handleVideoYTbClick={navigateToYoutube}
                    />
                    <LibraryList
                        videos={sortedWatchedDisLike}
                        title="video không thích"
                        toggleAll={navigateDisLikwAll}
                        handleVideoAppClick={navigateToVideo}
                        handleVideoYTbClick={navigateToYoutube}
                    />
                </>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default Library;
