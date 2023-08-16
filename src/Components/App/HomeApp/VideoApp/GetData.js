import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../firebase/fibefire';
export const GetVideoData = async (videoId) => {
    const commentsRef = collection(db, 'videos');
    const querySnapshot = await getDocs(commentsRef);

    const comments = [];
    querySnapshot.forEach((doc) => {
        comments.push({ id: doc.id, ...doc.data() });
    });

    return comments;
};

export const getCommentsByVideoId = async (videoId) => {
    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, where('videoId', '==', videoId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
};

export const getWatchedVideos = () => async (dispatch) => {
    const watchedVideosRef = collection(db, 'watchedVideos');
    const q = query(watchedVideosRef);
    const querySnapshot = await getDocs(q);
    const watchedVideos = querySnapshot.docs.map((doc) => doc.data());
    dispatch({ type: 'GET_WATCHED_VIDEOS', payload: watchedVideos });
};

export const getUserIdByComment = async (CommentId) => {
    const usersRef = collection(db, 'comments');
    const q = query(usersRef, where('CommentId', '==', CommentId));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].id;
    } else {
        return;
    }
};

export const getByIdVideo = async (VideoId) => {
    const usersRef = collection(db, 'watchedVideos');
    const q = query(usersRef, where('videoId', '==', VideoId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].id;
    } else {
        return;
    }
};
export const getvideoInter = async (VideoId) => {
    const usersRef = collection(db, 'videoInteractions');
    const q = query(usersRef, where('videoId', '==', VideoId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].id;
    } else {
        return;
    }
};

export const fetchData = async () => {
    try {
        const videosSnapshot = await getDocs(collection(db, 'watchedVideos'));
        const videosData = [];
        videosSnapshot.forEach((videoSnapshot) => {
            const videoData = videoSnapshot.data();
            videosData.push({
                videoId: videoSnapshot.id,
                ...videoData,
            });
        });

        return videosData;
    } catch (error) {
        return [];
    }
};
export const getByIdVideos = async (VideoId) => {
    try {
        const usersRef = collection(db, 'videos');
        const q = query(usersRef, where('videoId', '==', VideoId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].id;
        } else return;
    } catch (error) {
        throw error;
    }
};
