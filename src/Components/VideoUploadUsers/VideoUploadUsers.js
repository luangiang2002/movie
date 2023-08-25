import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { getVideoUploadUser } from '../../redux/action/libraryAction';
import { db } from '../../firebase/fibefire';
import { VIDEO_UPLOAD_USERS } from '../../redux/actionType';
import { toast } from 'react-toastify';
import { gethandleVideoClick } from '../GetAddWatches';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import ModalDetele from '../ModalDetele';
import NotFoundVideo from '../NotFoundVideo/NotFoundVideo.jsx';
import './VideoUploaduser.scss';
const VideoUploadUsers = () => {
    const { firebaseId } = useSelector((state) => state.imageAvatar);
    const { video } = useSelector((state) => state.library);
    const dispatch = useDispatch();
    const [showEditDelete, setShowEditDelete] = useState(null);

    const navigate = useNavigate();
    const handleVideoClick = async (video) => {
        await gethandleVideoClick(video, firebaseId, dispatch);
        navigate(`/videoapp/${video.videoId}`);
    };
    const sortedWatchedVideos = video.sort((a, b) => {
        const dateA = new Date(a.watchedAt);
        const dateB = new Date(b.watchedAt);
        return dateB - dateA;
    });
    const handleShowEditDelete = (videoid) => {
        if (showEditDelete === videoid) {
            setShowEditDelete(null);
        } else {
            setShowEditDelete(videoid);
        }
    };

    const deleteVideoInFirebase = async (videoId) => {
        try {
            const videoRef = doc(db, 'videos', videoId);
            await deleteDoc(videoRef);
        } catch (error) {
            throw error;
        }
    };
    const getByIdVideo = async (VideoId) => {
        const usersRef = collection(db, 'videos');
        const q = query(usersRef, where('videoId', '==', VideoId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].id;
        } else {
            return;
        }
    };
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
    const handleDeleteVideo = async (videoId) => {
        const id = await getByIdVideo(videoId);
        try {
            await deleteVideoInFirebase(id);

            const updatedVideo = video.filter((video) => video.videoId !== videoId);
            dispatch({ type: VIDEO_UPLOAD_USERS, payload: updatedVideo });

            toast.success('Xóa video thành công', {
                autoClose: 3000,
                position: 'top-right',
            });
        } catch (error) {
            toast.error('Xóa video thất bại', {
                autoClose: 3000,
                position: 'top-right',
            });
        }
    };
    const handleshowModal = () => {
        setSuccessModalOpen((pre) => !pre);
    };
    const handchanle = (channelID) => {
        navigate(`/channelapp/${channelID}`);
    };

    useEffect(() => {
        dispatch(getVideoUploadUser(firebaseId));
    }, [dispatch, firebaseId]);
    return (
        <div className="videoupload">
            <div>
                <h1 style={{ fontSize: '20px' }}>Video đã tải lên</h1>
            </div>
            {sortedWatchedVideos.length > 0 ? (
                <div className="videoupload_list">
                    {sortedWatchedVideos.map((video, i) => (
                        <div className="videoupload_video" key={i}>
                            <div className="videoupload_video--duration" onClick={() => handleVideoClick(video)}>
                                <img src={video.thumbnailsurl} alt="" />
                            </div>
                            <div className="videoupload_video--detail d-flex w-100">
                                <div className="videoupload_video--detail_title">
                                    <h4 onClick={handleVideoClick}>{video.title}</h4>
                                    <p
                                        className="videoupload_video--detail_author"
                                        onClick={() => handchanle(video.firebaseID)}
                                    >
                                        {video.channelTitle}
                                    </p>
                                    <p className="videoupload_video--detail_sub">
                                        {moment(video.timestamp).fromNow()}{' '}
                                    </p>
                                </div>
                                <div className="videoupload_video--detail_icon">
                                    {video?.firebaseID === firebaseId && (
                                        <>
                                            <BsThreeDotsVertical onClick={() => handleShowEditDelete(video?.videoId)} />
                                        </>
                                    )}
                                    {showEditDelete === video?.videoId && video?.firebaseID === firebaseId && (
                                        <>
                                            <button onClick={handleshowModal} className="delete">
                                                Xóa
                                            </button>
                                            <ModalDetele
                                                open={isSuccessModalOpen}
                                                onClose={() => setSuccessModalOpen(false)}
                                                onDelete={() => handleDeleteVideo(video?.videoId)}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <NotFoundVideo />
            )}
        </div>
    );
};

export default VideoUploadUsers;
