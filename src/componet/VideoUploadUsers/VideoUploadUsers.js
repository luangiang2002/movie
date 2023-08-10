import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { getVideoUploadUser } from '../../redux/action/libraryAction';
import './videouploaduser.scss';
import { db } from '../../firebase/fibefire';
import { VIDEO_UPLOAD_USERS } from '../../redux/actionType';
import { toast } from 'react-toastify';
import { getByIdVideo } from '../App/HomeApp/videoApp/GetData';
import { gethandleVideoClick } from '../GetAddWatches';
import { deleteDoc, doc } from 'firebase/firestore';
const VideoUploadUsers = () => {
    const { firebaseId } = useSelector((state) => state.imageAvatar);
    const { videos } = useSelector((state) => state.videouploaduser);
    const dispatch = useDispatch();
    const [showEditDelete, setShowEditDelete] = useState(null);

    const navigate = useNavigate();
    const handleVideoClick = async (video) => {
        await gethandleVideoClick(video, firebaseId, dispatch);
        navigate(`/videoapp/${video.videoId}`);
    };
    const sortedWatchedVideos = videos.sort((a, b) => {
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
            console.error('Lỗi khi xóa video từ Firestore:', error);
            throw error;
        }
    };

    const handleDeleteVideo = async (videoId) => {
        const id = await getByIdVideo(videoId);
        try {
            await deleteVideoInFirebase(id);

            const updatedVideo = videos.filter((video) => video.videoId !== videoId);
            dispatch({ type: VIDEO_UPLOAD_USERS, payload: updatedVideo });

            toast.success('Xóa video thành công', {
                autoClose: 3000,
                position: 'top-left',
            });
        } catch (error) {
            console.log(error);
            toast.error('Xóa video thất bại', {
                autoClose: 3000,
                position: 'top-left',
            });
        }
    };
    const handchanle = (channelID) => {
        navigate(`/channelapp/${channelID}`);
    };

    useEffect(() => {
        dispatch(getVideoUploadUser(firebaseId));
    }, [dispatch, firebaseId]);
    return (
        <div className="videoupload">
            <div className="videoupload_list">
                {sortedWatchedVideos.length > 0 ? (
                    sortedWatchedVideos.map((video, i) => (
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
                                        <button onClick={() => handleDeleteVideo(video?.videoId)} className="delete">
                                            Xóa
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Bạn chưa xem video </div>
                )}
            </div>
        </div>
    );
};

export default VideoUploadUsers;
