import React, { useEffect } from 'react'
import './library.scss'
import { useDispatch, useSelector } from 'react-redux';

import { getDisLikeVideosForUser, getLikeVideosForUser, getWatchedVideosForUser } from '../../redux/action/libraryAction';
import LibraryVideo from './libraryVideoAll/LibraryVideo';
import LibraryVideoLike from './libraryVideoAll/LibraryVideoLike';
import LibraryVideoDisLike from './libraryVideoAll/LibraryVideoDisLike';
const Library = () => {
    const { firebaseId } = useSelector(state => state.imageAvatar)
    const { watchedVideos, loading } = useSelector(state => state.library)
    const { likedVideos } = useSelector(state => state.library)
    const { DislikeVideos } = useSelector(state => state.library)
    const dispatch = useDispatch()
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

    return (
        <>
            {
                !loading ?
                    <>
                        <LibraryVideo sortedWatchedVideos={sortedWatchedVideos}  />
                        <LibraryVideoLike sortedWatchedLike={sortedWatchedLike}  />
                        <LibraryVideoDisLike sortedWatchedDisLike={sortedWatchedDisLike}  />
                    </>
                    :
                    <div>Loading...</div>
        }

        </>
    )
}

export default Library