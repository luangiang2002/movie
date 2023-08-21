import React, { useEffect, useState } from 'react';
import './VideoApp.scss';

import ShowMoreText from 'react-show-more-text';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import CommentApp from './CommentApp';
import { GetVideoData, getByIdVideo, getByIdVideos, getCommentsByVideoId } from './GetData';
import { VIDEO_COMMENT_SUCCESS } from '../../../../redux/actionType';
import { CommentAction } from '../../../../redux/action/commentAction';
import { videoUpload } from '../../../../redux/action/VideoActionApp';
import ReactPlayer from 'react-player';
import { getWatchedVideosForUser } from '../../../../redux/action/libraryAction';
import { handleCommenta, toggleSubscription } from '../../../comment/CommentDataFibe';
import LikeDislike from '../../../LikeDislike';
const VideoApp = () => {
    const { id } = useParams();
    const { videos, loading } = useSelector((state) => state.videosapp);
    const selectedVideo = videos.find((video) => video.videoId === id);
    const { urlAvatar } = useSelector((state) => state.imageAvatar);
    const avatarChannel = useSelector((state) => state.imageAvatar);
    const [subscribed, setSubscribed] = useState(false);
    const [comment, setComment] = useState('');
    const userId = avatarChannel.firebaseId;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = JSON.parse(localStorage.getItem('watch-user'));
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleComment();
        }
    };
    const handleComment = async () => {
        if (!userInfo || !userInfo.email) {
            toast.error('Bạn cần đăng nhập để bình luận', {
                autoClose: 3000,
                position: 'top-right',
            });
            return;
        }
        const datacomment = await handleCommenta(comment, selectedVideo, avatarChannel, setComment, userInfo);
        if (datacomment) {
            dispatch({ type: VIDEO_COMMENT_SUCCESS, payload: [...comments, datacomment] });
            setComment('');
            return;
        }
    };

    const handletoggleSubscription = async (video, reactionType) => {
        if (!userInfo) {
            toast.error('Bạn cần đăng nhập để đăng kí', {
                autoClose: 3000,
                position: 'top-right',
            });
            return;
        }
        const id = await getByIdVideo(video.videoId);
        const videoID = await getByIdVideos(video.videoId);
        await toggleSubscription(id, reactionType, setSubscribed, userId, videoID);
    };
    useEffect(() => {
        (async () => {
            const videos = await GetVideoData();
            dispatch(videoUpload(videos));
        })();
    }, [dispatch]);

    const { comments } = useSelector((state) => state.addcomment);

    useEffect(() => {
        (async () => {
            const comments = await getCommentsByVideoId(id);
            dispatch(CommentAction(comments));
        })();
    }, [dispatch, id]);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getWatchedVideosForUser(userId));
    }, [dispatch, location, userId]);

    useEffect(() => {
        if (selectedVideo?.subscribedby?.includes(userId)) {
            setSubscribed(true);
        } else {
            setSubscribed(false);
        }
    }, [selectedVideo?.subscribedby, userId]);
    const handchanle = (channelID) => {
        navigate(`/channelapp/${channelID}`);
    };

    return (
        <>
            <div className=" videoapp">
                {!loading && comments && (
                    <>
                        <ReactPlayer
                            url={selectedVideo?.video}
                            width="100%"
                            height="80vh"
                            playing={true}
                            controls={true}
                            loop={true}
                        />
                        <p className="videoapp_title">{selectedVideo?.title}</p>
                        <div className="videoapp_author d-flex">
                            <div className="videoapp_author--icon d-flex">
                                <img
                                    src={selectedVideo?.channelAvatar}
                                    alt=""
                                    onClick={() => handchanle(selectedVideo.firebaseID)}
                                />
                                <p onClick={() => handchanle(selectedVideo.firebaseID)}>
                                    {selectedVideo?.channelTitle}{' '}
                                </p>
                            </div>
                            <div className="videoapp_author--subcript">
                                {subscribed ? (
                                    <button
                                        className="dissubcript"
                                        onClick={() => handletoggleSubscription(selectedVideo, 'hủy đăng kí')}
                                    >
                                        Hủy đăng ký
                                    </button>
                                ) : (
                                    <button
                                        className="subcript"
                                        onClick={() => handletoggleSubscription(selectedVideo, 'đăng kí')}
                                    >
                                        Đăng ký
                                    </button>
                                )}
                            </div>
                            <div className="videoapp_author--like d-flex">
                                <LikeDislike
                                    selectedVideo={selectedVideo}
                                    id={selectedVideo?.videoId}
                                    userInfo={userInfo}
                                    userId={userId}
                                />
                            </div>
                        </div>
                        <div className="videoapp_description">
                            <ShowMoreText
                                lines={2}
                                more="Hiện thêm"
                                less="Ẩn bớt"
                                className="content-css"
                                anchorClass="show-more-less-clickable"
                                expanded={false}
                                truncatedEndingComponent={'... '}
                            >
                                <span>{moment(selectedVideo?.timestamp).fromNow()}</span> <br />
                                {selectedVideo?.description}
                            </ShowMoreText>
                        </div>

                        <div className="comments">
                            <div className="comments_input d-flex">
                                <img src={urlAvatar} alt="" />
                                <input
                                    type="text"
                                    placeholder="Viết bình luận"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <button onClick={handleComment}>Comment</button>
                            </div>
                            {!loading && <CommentApp id={id} loading={loading} comments={comments} />}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default VideoApp;
