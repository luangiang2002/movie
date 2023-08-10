import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../firebase/fibefire';
import { v4 as uuidv4 } from 'uuid';
import { fetchData, getByIdVideo } from '../App/HomeApp/videoApp/GetData';

const currentDate = new Date();
const currentTime = currentDate.toISOString();

export const handleCommenta = async (comment, selectedVideo, avatarChannel, setComment, userInfo) => {
    if (!comment) {
        toast.error('Vui lòng nhập bình luận trước khi gửi', {
            autoClose: 3000,
            position: 'top-left',
        });
        return;
    }

    const commentData = {
        CommentId: uuidv4(),
        videoId: selectedVideo.videoId,
        content: comment,
        displayName: userInfo.email,
        timestamp: currentTime,
        ChannelAvatar: avatarChannel.urlAvatar,
        thumbnailsurl: selectedVideo.thumbnailsurl,
        firebaseId: avatarChannel.firebaseId,
    };

    const commentsCollectionRef = collection(db, 'comments');
    await addDoc(commentsCollectionRef, commentData);
    toast.success('Gửi bình luận thành công', {
        autoClose: 3000,
        position: 'top-left',
    });
    setComment('');
    return commentData;
};

export const toggleSubscription = async (id, reactionType, setSubscribed, userId) => {
    try {
        const videoRef = doc(db, 'watchedVideos', id);
        const videoSnapshot = await getDoc(videoRef);

        if (videoSnapshot.exists()) {
            const videoData = videoSnapshot.data();
            const hasLikedBefore = Array.isArray(videoData.subscribedby) && videoData.subscribedby.includes(userId);

            if (reactionType === 'đăng kí' && !hasLikedBefore) {
                // Đăng ký video
                setSubscribed(true);
                videoData.subscribedby = videoData.subscribedby ? [...videoData.subscribedby, userId] : [userId];
                videoData.subscript = videoData.subscript ? videoData.subscript + 1 : 1;
            } else if (reactionType === 'hủy đăng kí' && hasLikedBefore) {
                // Hủy đăng ký video
                setSubscribed(false);
                videoData.subscribedby = videoData.subscribedby.filter((uid) => uid !== userId);
                videoData.subscript = videoData.subscript ? videoData.subscript - 1 : 0;
            }

            await updateDoc(videoRef, {
                subscript: videoData.subscript || 0,
                subscribedby: videoData.subscribedby || [],
            });
        }
    } catch (error) {
        console.error('Lỗi khi đăng ký hoặc hủy đăng ký video:', error);
    }
};

export const gethandleComment = async (id, commentAPi, urlAvatar, channeId, thumbnailsurl, avatarChannel, userInfo) => {
    if (!commentAPi) {
        toast.error('Vui lòng nhập bình luận trước khi gửi', {
            autoClose: 3000,
            position: 'top-left',
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
        position: 'top-left',
    });

    return commentData;
};

export const GethandleLikeDislike = async (videoId, reactionType, userId) => {
    try {
        const id = await getByIdVideo(videoId);
        const videoRef = doc(db, 'watchedVideos', id);
        const videoSnapshot = await getDoc(videoRef);

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

            await updateDoc(videoRef, commentData);
            return fetchData();
        }
    } catch (error) {
        toast.success('không thành công', {
            autoClose: 3000,
            position: 'top-left',
        });
    }
};
