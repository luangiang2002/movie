import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/fibefire';
import { getLibrary } from '../redux/action/libraryAction';

const userInfo = JSON.parse(localStorage.getItem('watch-user'));
const currentDate = new Date();
const currentTime = currentDate.toISOString();

export const gethandleVideoClick = async (video, firebaseId, dispatch) => {
    try {
        if (userInfo) {
            const videoData = {
                videoId: video.videoId,
                channelTitle: video.channelTitle,
                watchedAt: currentTime,
                thumbnail: video.thumbnailsurl,
                title: video.title,
                channelAvatar: video.channelAvatar,
                firebaseID: firebaseId,
                like: 0,
                dislike: 0,
            };
            const watchedVideosRef = collection(db, 'watchedVideos');
            dispatch(getLibrary(videoData));
            await addDoc(watchedVideosRef, videoData);
        }
    } catch (error) {
        throw error;
    }
};

export const getYoutubeClick = async (video, firebaseId, dispatch) => {
    try {
        if (userInfo && video.id.videoId) {
            const videoData = {
                videoId: video.id.videoId,
                channelTitle: video.snippet.channelTitle,
                watchedAt: currentTime,
                thumbnail: video.snippet.thumbnails.default.url,
                title: video.snippet.title,
                firebaseID: firebaseId,
                channelId: video.snippet.channelId,
                like: 0,
                dislike: 0,
                subscript: '',
                content: 'youtubeApi',
            };
            const watchedVideosRef = collection(db, 'watchedVideos');
            dispatch(getLibrary(videoData));
            await addDoc(watchedVideosRef, videoData);
        }
    } catch (error) {
        throw error;
    }
};
