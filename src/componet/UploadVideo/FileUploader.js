import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage, db } from '../../firebase/fibefire';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { getUserIdByEmail } from '../AvatarLogin/FirebaseData';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ClipLoader } from 'react-spinners';
import './FileUploader.scss'
import { Link, useNavigate } from 'react-router-dom';
import { VIDEO_UPDATE_SUCCESS } from '../../redux/actionType';
const VideoUploader = ({ userInfo }) => {
    const [videoUrl, setVideoUrl] = useState(null);
    const [uploading, setUploading] = useState('kéo hoặc nhấn vào đây để tải ảnh lên ....');
    const urlAvatar = useSelector((state) => state.imageAvatar);
    const [thumbnailsurl, setThumbnailsurl] = useState('');
    const [id, setId] = useState()
    const [videoInfo, setVideoInfo] = useState({
        title: '',
        description: '',
        channelAvatar: '',
        thumbnailsurl: '',
        channelTitle: '',
        firebaseID: '',
    });
    const dispatch = useDispatch();
    const onDrop = useCallback(async (acceptedFiles) => {
        setUploading(<ClipLoader color="#36D7B7" loading={uploading} size={30} />);
        const file = acceptedFiles[0];
        const video = uuidv4();
        const videoName = `video_${video}.mp4`;

        const avatarRef = ref(storage, `${userInfo?.email}/${videoName}`);

        await uploadBytes(avatarRef, file); // Lưu video vào Firebase Storage

        const downloadUrl = await getDownloadURL(avatarRef);

        setVideoUrl(downloadUrl);

        toast.success(`Tải lên video thành công`, {
            autoClose: 3000,
            position: 'top-left',
        });
        setUploading('tệp đã tải lên thành công hoàn thành các bước tiếp theo để tải video lên...');
    }, [uploading, userInfo?.email]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setVideoInfo({
            ...videoInfo,
            [name]: value,
        });
    };

    const handleThumbnailChange = async (event) => {
        const file = event.target.files[0];
        const storageRef = ref(storage, `${userInfo?.email}/${file.name}`);
        await uploadBytes(storageRef, file);

        const downloadUrl = await getDownloadURL(storageRef);
        setThumbnailsurl(downloadUrl);
    };

    const navigate = useNavigate();
    const handlePublish = async () => {
        if (!videoUrl) {
            toast.error('Vui lòng tải lên video trước khi đăng', {
                autoClose: 3000,
                position: 'top-left',
            });
        }

        // Lưu thông tin video và đường dẫn vào Firestore
        const currentDate = new Date();
        const currentTime = currentDate.toISOString();
        const videoid = uuidv4();
        const videoData = {
            ...videoInfo,
            video: videoUrl,
            videoId:videoid,
            thumbnailsurl: thumbnailsurl,
            timestamp: currentTime,
            firebaseID: id,
            channelAvatar: urlAvatar?.urlAvatar,
        };

        const videosCollectionRef = collection(db, 'videos');
        await addDoc(videosCollectionRef, videoData);
        dispatch({ type: VIDEO_UPDATE_SUCCESS, payload: videoData });
        toast.success('Đăng video thành công', {
            autoClose: 3000,
            position: 'top-left',
        });

        // Reset thông tin video và đường dẫn URL sau khi đã đăng
        setVideoInfo({
            title: '',
            description: '',
        });
        setVideoUrl(null);
        setTimeout(() => {
            navigate('/homeapp');
            window.location.reload();
        }, 5000);
    };
    useEffect(() => {
        if (userInfo && userInfo.email) {
            getUserIdByEmail(userInfo.email)
                .then((id) => {
                    setId(id)
                    const docRef = collection(db, 'videos');
                    const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
                        const newVideos = [];
                        querySnapshot.forEach((doc) => {
                            newVideos.push({ id: doc.id, ...doc.data() });
                            dispatch({ type: VIDEO_UPDATE_SUCCESS, payload: newVideos })
                        });
                    });
                    return () => unsubscribe();
                })
                .catch((error) => {
                    console.error('Đã xảy ra lỗi:', error);
                });
        }
    }, [dispatch, userInfo]);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    return (
        <div className='fileupload'>
            <div {...getRootProps()} className='fileupload_dropzoneStyle'>
                <input {...getInputProps()} />
                <p>{uploading}</p>
            </div>
            {/* {videoUrl && ( */}
            <div className='fileupload_video'>
                <h2>Thông tin về video:</h2>
                <input
                    type="text"
                    name="title"
                    value={videoInfo.title}
                    onChange={handleInputChange}
                    placeholder="Tiêu đề"
                />
                <input
                    type="text"
                    name="channelTitle"
                    value={videoInfo.channelTitle}
                    onChange={handleInputChange}
                    placeholder="name chanel "
                />
                <textarea
                    name="description"
                    value={videoInfo.description}
                    onChange={handleInputChange}
                    placeholder="Mô tả"
                ></textarea>
                <label htmlFor="image">chọn ảnh bìa video</label>
                <input
                    type="file"
                    accept="image/*"
                    id='image'
                    onChange={handleThumbnailChange}
                />
                <br />
                <button onClick={handlePublish}>Đăng video</button>
                <Link to='/'>Trở về </Link>
            </div>
            {/* )} */}
        </div>
    );
};

export default VideoUploader;