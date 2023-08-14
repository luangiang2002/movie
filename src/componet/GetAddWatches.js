import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/fibefire';
import { getLibrary } from '../redux/action/libraryAction';

const userInfo = JSON.parse(localStorage.getItem('watch-user'));
const currentDate = new Date();
const currentTime = currentDate.toISOString();

export const gethandleVideoClick = async (video, firebaseId, dispatch) => {
    try {
        if (!userInfo) {
            return;
        }
        const watchedVideosRef = collection(db, 'watchedVideos');
        const querySnapshot = await getDocs(
            query(watchedVideosRef, where('videoId', '==', video.videoId), where('firebaseID', '==', firebaseId)),
        );
        if (querySnapshot.empty) {
            const videoData = {
                videoId: video.videoId,
                channelTitle: video.channelTitle,
                watchedAt: currentTime,
                thumbnail: video.thumbnailsurl,
                title: video.title,
                channelAvatar: video.channelAvatar,
                firebaseID: firebaseId,
            };

            dispatch(getLibrary(videoData));
            await addDoc(watchedVideosRef, videoData);
        }
    } catch (error) {
        throw error;
    }
};

export const getYoutubeClick = async (video, firebaseId, dispatch) => {
    try {
        if (!userInfo && !video.id.videoId) {
            return;
        }
        const watchedVideosRef = collection(db, 'watchedVideos');
        const querySnapshot = await getDocs(
            query(watchedVideosRef, where('videoId', '==', video.id.videoId), where('firebaseID', '==', firebaseId)),
        );
        const videoData = {
            videoId: video.id.videoId,
            channelTitle: video.snippet.channelTitle,
            watchedAt: currentTime,
            thumbnail: video.snippet.thumbnails.default.url,
            title: video.snippet.title,
            firebaseID: firebaseId,
            channelId: video.snippet.channelId,
            content: 'youtubeApi',
        };
        if (querySnapshot.empty) {
            dispatch(getLibrary(videoData));
            await addDoc(watchedVideosRef, videoData);
        }

        const videoInter = collection(db, 'videoInteractions');
        const videoSInter = await getDocs(query(videoInter, where('videoId', '==', video.id.videoId)));
        if (videoSInter.empty) {
            await addDoc(videoInter, videoData);
        }
    } catch (error) {
        throw error;
    }
};
