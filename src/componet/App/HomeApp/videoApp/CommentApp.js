import React, { useEffect }  from 'react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { getCommentsByVideoId } from './GetData';
import { CommentAction } from '../../../../redux/action/commentAction';

const CommentApp = ({id,loading,comments}) => {
    const dispatch = useDispatch();
    const sortedComments = comments.slice().sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return dateB - dateA;
    });
  useEffect(() => {
    const fetchComments = async () => {
      const comments = await getCommentsByVideoId(id);
      dispatch(CommentAction(comments)); // Gửi action để cập nhật danh sách comment trong store
    };
    fetchComments();
  }, [dispatch, id]);
    return (
        <>
            {!loading && sortedComments.map((comment, i) => (
                <div className='comments' key={i}>
                    <div className='comments_comment d-flex'>
                        <img src={comment?.ChannelAvatar} alt='' />
                        <div className='comments_comment--author'>
                            <div className=''>
                                <p>
                                    <b>{comment?.displayName}</b>{' '}
                                    <span>{moment(comment?.timestamp).fromNow()}</span>
                                    <p>{comment?.content}</p>
                                </p>
                            </div>
                            <div className='d-flex'>
                                <p>
                                    <AiOutlineLike />
                                    <span>0</span>
                                </p>
                                <hr />
                                <p>
                                    <AiOutlineDislike />
                                    <span>0</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <p></p>
        </>
    );
};

export default CommentApp;
