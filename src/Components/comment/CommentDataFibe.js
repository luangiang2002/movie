import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../firebase/fibefire';
import { v4 as uuidv4 } from 'uuid';
import { getByIdVideo, getByIdVideos, getvideoInter } from '../App/HomeApp/VideoApp/GetData';

const currentDate = new Date();
const currentTime = currentDate.toISOString();

export const handleCommenta = async (comment, selectedVideo, avatarChannel, setComment, userInfo) => {
    if (!comment) {
        toast.error('Vui lòng nhập bình luận trước khi gửi', {
            autoClose: 3000,
            position: 'top-right',
        });
        return;
    }

    const commentData = {
        CommentId: uuidv4(),
        videoId: selectedVideo.videoId,
        content: comment,
        displayName: userInfo.email,
        timestamp: currentTime,
        ChannelAvatar: avatarChannel.urlAvatar || '',
        thumbnailsurl: selectedVideo.thumbnailsurl || '',
        firebaseId: avatarChannel.firebaseId,
    };

    const commentsCollectionRef = collection(db, 'comments');
    await addDoc(commentsCollectionRef, commentData);
    toast.success('Gửi bình luận thành công', {
        autoClose: 3000,
        position: 'top-right',
    });
    setComment('');
    return commentData;
};

export const gethandleComment = async (id, commentAPi, urlAvatar, channeId, thumbnailsurl, avatarChannel, userInfo) => {
    if (!commentAPi) {
        toast.error('Vui lòng nhập bình luận trước khi gửi', {
            autoClose: 3000,
            position: 'top-right',
        });
        return;
    }
    const commentData = {
        CommentId: uuidv4(),
        videoId: id,
        content: commentAPi,
        displayName: userInfo.email,
        timestamp: currentTime,
        ChannelAvatar: urlAvatar,
        comment: 'youtubeApi',
        channeId: channeId,
        thumbnailsurl: thumbnailsurl,
        firebaseId: avatarChannel.firebaseId,
    };

    const commentsCollectionRef = collection(db, 'comments');
    await addDoc(commentsCollectionRef, commentData);

    toast.success('Gửi bình luận thành công', {
        autoClose: 3000,
        position: 'top-right',
    });

    return commentData;
};

export const GethandleLikeDislike = async (videoId, reactionType, userId) => {
    try {
        const id = await getByIdVideo(videoId);
        const videoID = await getByIdVideos(videoId);
        const videoInter = await getvideoInter(videoId);

        const watchedVideosRef = doc(db, 'watchedVideos', id);
        const videoSnapshot = await getDoc(watchedVideosRef);

        if (videoSnapshot.exists()) {
            const videoData = videoSnapshot.data();
            const likedBy = videoData.likedBy || [];
            const dislikedBy = videoData.dislikedBy || [];
            let updatedLikedBy = [...likedBy];
            let updatedDislikedBy = [...dislikedBy];

            if (reactionType === 'like') {
                if (!likedBy.includes(userId)) {
                    updatedLikedBy.push(userId);
                    updatedDislikedBy = updatedDislikedBy.filter((id) => id !== userId);
                } else {
                    updatedLikedBy = updatedLikedBy.filter((id) => id !== userId);
                }
            } else if (reactionType === 'dislike') {
                if (!dislikedBy.includes(userId)) {
                    updatedDislikedBy.push(userId);
                    updatedLikedBy = updatedLikedBy.filter((id) => id !== userId);
                } else {
                    updatedDislikedBy = updatedDislikedBy.filter((id) => id !== userId);
                }
            }

            const commentData = {
                likedBy: updatedLikedBy,
                dislikedBy: updatedDislikedBy,
                like: updatedLikedBy.length,
                dislike: updatedDislikedBy.length,
            };
            if (videoID) {
                const videoRef = doc(db, 'videos', videoID);
                await getDoc(videoRef);
                await updateDoc(videoRef, commentData);
            } else {
                const videoRef = doc(db, 'videoInteractions', videoInter);
                await getDoc(videoRef);
                await updateDoc(videoRef, commentData);
            }
            await updateDoc(watchedVideosRef, commentData);
        }
    } catch (error) {
        toast.error('không thành công', {
            autoClose: 3000,
            position: 'top-right',
        });
    }
};
