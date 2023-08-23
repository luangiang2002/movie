import React, { useEffect, useState } from 'react';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { GethandleLikeDislike } from './comment/CommentDataFibe';

const LikeDislike = ({ selectedVideo, id, userInfo, userId }) => {
    const initialLiked = selectedVideo?.likedBy?.includes(userId);
    const initialDisliked = selectedVideo?.dislikedBy?.includes(userId);

    const [localLiked, setLocalLiked] = useState(initialLiked);
    const [localDisliked, setLocalDisliked] = useState(initialDisliked);
    const [localLikeCount, setLocalLikeCount] = useState(selectedVideo?.like || 0);
    const [localDislikeCount, setLocalDislikeCount] = useState(selectedVideo?.dislike || 0);

    const handleLikeDislike = async (videoId, reactionType) => {
        if (!userInfo) {
            toast.error('Bạn cần đăng nhập để thực hiện hành động này', {
                autoClose: 3000,
                position: 'top-right',
            });
            return;
        }

        if (reactionType === 'like') {
            if (localLiked) {
                setLocalLiked(false);
                setLocalLikeCount((prevCount) => prevCount - 1);
            } else {
                setLocalLiked(true);
                setLocalLikeCount((prevCount) => prevCount + 1);
                if (localDisliked) {
                    setLocalDisliked(false);
                    setLocalDislikeCount((prevCount) => prevCount - 1);
                }
            }
        } else if (reactionType === 'dislike') {
            if (localDisliked) {
                setLocalDisliked(false);
                setLocalDislikeCount((prevCount) => prevCount - 1);
            } else {
                setLocalDisliked(true);
                setLocalDislikeCount((prevCount) => prevCount + 1);
                if (localLiked) {
                    setLocalLiked(false);
                    setLocalLikeCount((prevCount) => prevCount - 1);
                }
            }
        }

        await GethandleLikeDislike(videoId, reactionType, userId);
    };
    useEffect(() => {
        setLocalLiked(selectedVideo?.likedBy?.includes(userId));
        setLocalDisliked(selectedVideo?.dislikedBy?.includes(userId));
        setLocalLikeCount(selectedVideo?.like);
        setLocalDislikeCount(selectedVideo?.dislike);
    }, [selectedVideo, userId]);
    return (
        <>
            <p>
                <AiFillLike
                    className={`like-button ${localLiked ? 'like' : ''}`}
                    onClick={() => handleLikeDislike(id, 'like')}
                />
                <span>{localLikeCount}</span>
            </p>
            <hr />
            <p>
                <AiFillDislike
                    className={`like-button ${localDisliked ? 'dislike' : ''}`}
                    onClick={() => handleLikeDislike(id, 'dislike')}
                />
                <span>{localDislikeCount}</span>
            </p>
        </>
    );
};

export default LikeDislike;
