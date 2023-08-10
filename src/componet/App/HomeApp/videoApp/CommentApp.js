import React, { useEffect, useState } from 'react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsByVideoId, getUserIdByComment } from './GetData';
import { CommentAction } from '../../../../redux/action/commentAction';
import { BsThreeDotsVertical } from 'react-icons/bs';
import './commentapp.scss';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/fibefire';
import { toast } from 'react-toastify';
import { VIDEO_COMMENT_SUCCESS } from '../../../../redux/actionType';
const CommentApp = ({ id, loading, comments }) => {
    const dispatch = useDispatch();
    const [showEditDelete, setShowEditDelete] = useState(null);
    const [editing, setEditing] = useState(null);
    const [editedContent, setEditedContent] = useState('');

    const sortedComments = comments.slice().sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return dateB - dateA;
    });
    const { firebaseId } = useSelector((state) => state.imageAvatar);

    const handleEditComment = (commentId) => {
        if (editing === commentId) {
            setEditing(null);
        } else {
            setEditing(commentId);
            const commentToEdit = comments.find((comment) => comment.CommentId === commentId);
            setEditedContent(commentToEdit.content);
            setShowEditDelete(null);
        }
    };
    const handleShowEditDelete = (commentId) => {
        if (showEditDelete === commentId) {
            setShowEditDelete(null);
        } else {
            setShowEditDelete(commentId);
        }
    };
    const handleEditedContentChange = (e) => {
        setEditedContent(e.target.value);
    };
    const updateCommentInFirebase = async (commentId, editedContent) => {
        const commentRef = doc(db, 'comments', commentId);
        await updateDoc(commentRef, {
            content: editedContent,
        });
    };
    const handleSaveEdit = async (commentId) => {
        try {
            const id = await getUserIdByComment(commentId);
            await updateCommentInFirebase(id, editedContent);

            const updatedComments = comments.map((comment) => {
                if (comment.CommentId === commentId) {
                    return {
                        ...comment,
                        content: editedContent,
                    };
                } else {
                    return comment;
                }
            });
            dispatch({ type: VIDEO_COMMENT_SUCCESS, payload: updatedComments });

            toast.success('Chỉnh sửa Thành công', {
                autoClose: 3000,
                position: 'top-left',
            });
            setEditing(false);
        } catch (error) {
            console.log(error);
            toast.error('Chỉnh sửa thất bại', {
                autoClose: 3000,
                position: 'top-left',
            });
        }
    };
    const deleteCommentInFirebase = async (commentId) => {
        const commentRef = doc(db, 'comments', commentId);
        await deleteDoc(commentRef);
    };
    const handleDeleteComment = async (commentId) => {
        try {
            const id = await getUserIdByComment(commentId);
            await deleteCommentInFirebase(id);

            const updatedComments = comments.filter((comment) => comment.CommentId !== commentId);
            dispatch({ type: VIDEO_COMMENT_SUCCESS, payload: updatedComments });

            toast.success('Xóa comment thành công', {
                autoClose: 3000,
                position: 'top-left',
            });
        } catch (error) {
            console.log(error);
            toast.error('Xóa comment thất bại', {
                autoClose: 3000,
                position: 'top-left',
            });
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            const comments = await getCommentsByVideoId(id);
            dispatch(CommentAction(comments));
        };
        fetchComments();
    }, [dispatch, id]);
    return (
        <>
            {!loading &&
                sortedComments.map((comment, i) => (
                    <div className="comments commentappp" key={i}>
                        <div className="comments_comment d-flex">
                            <img src={comment?.ChannelAvatar} alt="" />
                            <div className="comments_comment--author">
                                <div className="">
                                    <div>
                                        <b>{comment?.displayName}</b>{' '}
                                        <span>{moment(comment?.timestamp).fromNow()}</span>
                                        <div className="comment_edit">
                                            {editing === comment?.CommentId && comment?.firebaseId === firebaseId ? (
                                                <input
                                                    type="text"
                                                    value={editedContent}
                                                    onChange={handleEditedContentChange}
                                                />
                                            ) : (
                                                <p>{comment?.content}</p>
                                            )}
                                            <div className="edit-delete-buttons">
                                                {editing === comment?.CommentId &&
                                                    comment?.firebaseId === firebaseId && (
                                                        <button onClick={() => handleSaveEdit(comment?.CommentId)}>
                                                            Save
                                                        </button>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex">
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
                        <div className="commentappp_icon">
                            {comment?.firebaseId === firebaseId && (
                                <>
                                    <BsThreeDotsVertical onClick={() => handleShowEditDelete(comment?.CommentId)} />
                                </>
                            )}
                            {showEditDelete === comment?.CommentId && comment?.firebaseId === firebaseId && (
                                <EditDeleteButtons
                                    onDelete={() => handleDeleteComment(comment?.CommentId)}
                                    onEdit={() => handleEditComment(comment?.CommentId)}
                                />
                            )}
                        </div>
                    </div>
                ))}
        </>
    );
};

export default CommentApp;

const EditDeleteButtons = ({ onDelete, onEdit }) => {
    return (
        <div className="button_edit">
            <button onClick={onDelete}>Xóa</button>
            <button onClick={onEdit}>Chỉnh sửa</button>
        </div>
    );
};
