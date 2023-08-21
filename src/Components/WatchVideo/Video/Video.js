import React, { useEffect, useState } from 'react';
import './Video.scss';
import ShowMoreText from 'react-show-more-text';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { VIDEO_COMMENT_SUCCESS } from '../../../redux/actionType';
import { CommentAction } from '../../../redux/action/commentAction';
import CommentApp from '../../App/HomeApp/VideoApp/CommentApp';
import { getChannel } from '../../../redux/action/videoAction';
import { getVideoInter, getWatchedVideosForUser } from '../../../redux/action/libraryAction';
import { gethandleComment, toggleSubscription } from '../../comment/CommentDataFibe';
import { getByIdVideo, getCommentsByVideoId, getvideoInter } from '../../App/HomeApp/VideoApp/GetData';
import LikeDislike from '../../LikeDislike';

const Video = ({ id, video }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { urlAvatar } = useSelector((state) => state.imageAvatar);
    const { channel, loading } = useSelector((state) => state.videoChannel);
    const avatarChannel = useSelector((state) => state.imageAvatar);
    const _video = video?.videoid[0];
    const channeId = _video?.snippet?.channelId;
    const thumbnailsurl = _video?.snippet?.thumbnails?.default?.url;
    const { comments } = useSelector((state) => state?.addcomment);
    const { videos } = useSelector((state) => state.library);
    const interactions = videos.find((video) => video.videoId === id);
    const userId = avatarChannel.firebaseId;
    const [subscribed, setSubscribed] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem('watch-user'));
    const handleChannel = () => {
        navigate(`/channel/${channeId}`);
    };
    const [commentAPi, setComment] = useState('');
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
        const datacomment = await gethandleComment(
            id,
            commentAPi,
            urlAvatar,
            channeId,
            thumbnailsurl,
            avatarChannel,
            userInfo,
        );
        if (datacomment) {
            dispatch({ type: VIDEO_COMMENT_SUCCESS, payload: [...comments, datacomment] });
            setComment('');
            return;
        }
    };
    const handletoggleSubscription = async (videoId, reactionType) => {
        if (!userInfo) {
            toast.error('Bạn cần đăng nhập để đăng kí', {
                autoClose: 3000,
                position: 'top-right',
            });
            return;
        }
        const id = await getByIdVideo(videoId);
        const videoInter = await getvideoInter(videoId);
        const videoID = '';
        await toggleSubscription(id, reactionType, setSubscribed, userId, videoID, videoInter);
    };

    useEffect(() => {
        (async () => {
            const comments = await getCommentsByVideoId(id);
            dispatch(CommentAction(comments));
        })();
    }, [dispatch, id]);
    useEffect(() => {
        dispatch(getChannel(channeId));
        dispatch(getWatchedVideosForUser(userId));
        dispatch(getVideoInter(id));
    }, [dispatch, id, channeId, userId]);

    useEffect(() => {
        if (interactions?.subscribedby?.includes(userId)) {
            setSubscribed(true);
        } else {
            setSubscribed(false);
        }
    }, [interactions?.subscribedby, userId]);
    return (
        <>
            {!loading && (
                <>
                    <div className=" video">
                        <iframe
                            width="100%"
                            src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1`}
                            allow="fullscreen"
                            title={_video?.snippet?.title}
                        ></iframe>
                        <p>{_video?.snippet?.title}</p>
                        {channel && channel.channel && channel.channel[0] && channel.channel[0].snippet && (
                            <>
                                <div className="video_author d-flex">
                                    <div className="video_author--icon d-flex">
                                        <img src={channel?.channel[0].snippet.thumbnails.default.url} alt="" />
                                        <p onClick={handleChannel}>{_video?.snippet?.channelTitle} </p>
                                    </div>
                                    <div className="video_author--subcript">
                                        {subscribed ? (
                                            <button
                                                className="dissubcript"
                                                onClick={() => handletoggleSubscription(id, 'hủy đăng kí')}
                                            >
                                                Hủy đăng ký
                                            </button>
                                        ) : (
                                            <button
                                                className="subcript"
                                                onClick={() => handletoggleSubscription(id, 'đăng kí')}
                                            >
                                                Đăng ký
                                            </button>
                                        )}
                                    </div>
                                    <div className="videoapp_author--like d-flex">
                                        <LikeDislike
                                            selectedVideo={interactions}
                                            id={id}
                                            userInfo={userInfo}
                                            userId={userId}
                                        />
                                    </div>
                                </div>
                                <div className="video_description">
                                    <ShowMoreText
                                        lines={2}
                                        more="Hiện thêm"
                                        less="Ẩn bớt"
                                        className="content-css"
                                        anchorClass="show-more-less-clickable"
                                        expanded={false}
                                        truncatedEndingComponent={'... '}
                                    >
                                        <span>{moment(channel?.channel[0].snippet.publishedAt).fromNow()}</span> <br />
                                        {channel?.channel[0].snippet.description}
                                    </ShowMoreText>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="comments">
                        <div className="comments_input d-flex">
                            <img src={urlAvatar} alt="" />
                            <input
                                type="text"
                                placeholder="Viết bình luận"
                                value={commentAPi}
                                onChange={(e) => setComment(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button onClick={handleComment}>Comment</button>
                        </div>
                        <>{!loading && <CommentApp id={id} loading={loading} comments={comments} />}</>
                    </div>
                </>
            )}
        </>
    );
};

export default Video;
