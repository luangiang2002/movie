import { db } from '../../firebase/fibefire';
import {
    LIBRARY_DISLIKE,
    LIBRARY_LIKE,
    LIBRARY_SUBRIPTS,
    LIBRARY_VIDEO,
    VIDEO_INTER,
    VIDEO_UPLOAD_USERS,
} from '../actionType';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const getLibrary = (videos) => (dispatch) => {
    try {
        dispatch({
            type: LIBRARY_VIDEO,
            payload: videos,
        });
        dispatch({
            type: LIBRARY_LIKE,
            payload: videos,
        });
        dispatch({
            type: LIBRARY_DISLIKE,
            payload: videos,
        });
        dispatch({
            type: LIBRARY_SUBRIPTS,
            payload: videos,
        });
    } catch (error) {
        throw error;
    }
};

export const getWatchedVideosForUser = (firebaseID) => async (dispatch) => {
    try {
        const watchedVideosRef = collection(db, 'watchedVideos');
        const q = query(watchedVideosRef, where('firebaseID', '==', firebaseID));

        const querySnapshot = await getDocs(q);
        const watchedVideosData = [];
        querySnapshot.forEach((doc) => {
            // Thêm dữ liệu vào mảng watchedVideosData
            watchedVideosData.push(doc.data());
        });
        dispatch({
            type: LIBRARY_VIDEO,
            payload: watchedVideosData,
        });
    } catch (error) {
        throw error;
    }
};
export const getLikeVideosForUser = (firebaseId) => async (dispatch) => {
    try {
        const likedVideos = [];
        const likedVideosRef = collection(db, 'watchedVideos');
        const q = query(likedVideosRef, where('likedBy', 'array-contains', firebaseId));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const videoData = doc.data();
            likedVideos.push(videoData);
        });
        dispatch({
            type: LIBRARY_LIKE,
            payload: likedVideos,
        });
    } catch (error) {
        throw error;
    }
};
export const getDisLikeVideosForUser = (firebaseId) => async (dispatch) => {
    try {
        const dislikedVideos = [];
        const likedVideosRef = collection(db, 'watchedVideos');
        const q = query(likedVideosRef, where('dislikedBy', 'array-contains', firebaseId));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const videoData = doc.data();
            dislikedVideos.push(videoData);
        });
        dispatch({
            type: LIBRARY_DISLIKE,
            payload: dislikedVideos,
        });
    } catch (error) {
        throw error;
    }
};
export const getSubscriptVideosForUser = (firebaseId) => async (dispatch) => {
    try {
        const subripts = [];
        const likedVideosRef = collection(db, 'channelSubscriptions');
        const q = query(likedVideosRef, where('userIds', 'array-contains', firebaseId));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const videoData = doc.data();
            subripts.push(videoData);
        });
        dispatch({
            type: LIBRARY_SUBRIPTS,
            payload: subripts,
        });
    } catch (error) {
        throw error;
    }
};
export const getVideoUploadUser = (firebaseId) => async (dispatch) => {
    try {
        const video = [];
        const likedVideosRef = collection(db, 'videos');
        const q = query(likedVideosRef, where('firebaseID', '==', firebaseId));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const videoData = doc.data();
            video.push(videoData);
        });
        dispatch({
            type: VIDEO_UPLOAD_USERS,
            payload: video,
        });
    } catch (error) {
        throw error;
    }
};
export const getVideoInter = (videoId) => async (dispatch) => {
    try {
        const videos = [];
        const likedVideosRef = collection(db, 'videoInteractions');
        const q = query(likedVideosRef, where('videoId', '==', videoId));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const videoData = doc.data();
            videos.push(videoData);
        });
        dispatch({
            type: VIDEO_INTER,
            payload: videos,
        });
    } catch (error) {
        throw error;
    }
};
