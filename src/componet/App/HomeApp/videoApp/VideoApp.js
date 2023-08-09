import React, { useEffect, useState } from 'react'
import './videoapp.scss'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'
import ShowMoreText from "react-show-more-text";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../../firebase/fibefire';
import CommentApp from './CommentApp';
import { GetVideoData, getCommentsByVideoId } from './GetData';
import { VIDEO_COMMENT_SUCCESS } from '../../../../redux/actionType';
import { CommentAction } from '../../../../redux/action/commentAction';
import { videoUpload } from '../../../../redux/action/VideoActionApp';
import ReactPlayer from 'react-player';
const VideoApp = () => {
    const { id } = useParams()
    const { videos, loading } = useSelector(state => state.videosapp)
    const selectedVideo = videos.find(video => video.videoId === id);
    const { urlAvatar } = useSelector(state => state.imageAvatar)
    const [comment, setComment] = useState('');
    const avatarChannel = useSelector(state => state.imageAvatar)
    const dispatch = useDispatch();
    const handleInputChange = (event) => {
        setComment(event.target.value);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleComment();
        }
    };

    const handleComment = async () => {
        if (!comment) {
            toast.error('Vui lòng nhập bình luận trước khi gửi', {
                autoClose: 3000,
                position: 'top-left',
            });
            return;
        }
        const userInfo = JSON.parse(localStorage.getItem('watch-user'));
        if (!userInfo) {
            toast.error('Bạn cần đăng nhập để bình luận', {
                autoClose: 3000,
                position: 'top-left',
            });
            return;
        }
        const currentDate = new Date();
        const currentTime = currentDate.toISOString();
        const commentData = {
            CommentId: uuidv4(),
            videoId: selectedVideo.videoId,
            content: comment,
            displayName: userInfo.email,
            timestamp: currentTime,
            ChannelAvatar: avatarChannel.urlAvatar
        };

        const commentsCollectionRef = collection(db, 'comments');
        await addDoc(commentsCollectionRef, commentData);

        dispatch({ type: VIDEO_COMMENT_SUCCESS, payload: [...comments, commentData] });

        toast.success('Gửi bình luận thành công', {
            autoClose: 3000,
            position: 'top-left',
        });
        setComment('');
    }

    useEffect(() => {
        const fetchComments = async () => {
            const videos = await GetVideoData();
            dispatch(videoUpload(videos));
        };

        fetchComments();
    }, [dispatch]);
    const { comments } = useSelector(state => state.addcomment)
    useEffect(() => {
        const fetchComments = async () => {
            const comments = await getCommentsByVideoId(id);
            dispatch(CommentAction(comments));
        };
        fetchComments();
    }, [dispatch, id]);
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
  
    return (
        <>
            <div className=' videoapp'>
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
                        <p className='videoapp_title'>{selectedVideo?.title}</p>
                        <div className="videoapp_author d-flex">
                            <div className="videoapp_author--icon d-flex">
                                <img src={selectedVideo?.channelAvatar} alt="" />
                                <p>{selectedVideo?.channelTitle} </p>
                            </div>
                            <div className="videoapp_author--subcript">
                                <button>Đăng kí</button>
                            </div>
                            <div className='videoapp_author--like d-flex'>
                                <p><AiOutlineLike /><span>0</span></p>
                                <hr />
                                <p><AiOutlineDislike /><span>0</span></p>
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
                                truncatedEndingComponent={"... "}
                            >
                                <span>{moment(selectedVideo?.timestamp).fromNow()}</span> <br />
                                {selectedVideo?.description}
                            </ShowMoreText>
                        </div>

                        <div className="comments">
                            <div className="comments_input d-flex">
                                <img src={urlAvatar} alt="" />
                                <input type="text" placeholder='Viết bình luận' value={comment} onChange={handleInputChange} onKeyDown={handleKeyDown} />
                                <button onClick={handleComment}>Comment</button>
                            </div>
                            {!loading &&
                                <CommentApp id={id} loading={loading} comments={comments} />
                            }
                        </div>

                    </>
                )}
            </div>
        </>
    )
}

export default VideoApp