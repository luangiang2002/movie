import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage, db } from '../../firebase/fibefire';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ClipLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { VIDEO_UPDATE_SUCCESS } from '../../redux/actionType';
import UploadVideoIcon from '../../assets/images/upload-video.png';
import './FileUploader.scss';
import { AiOutlineCloudUpload } from 'react-icons/ai';

const VideoUploader = ({ userInfo }) => {
    const [videoUrl, setVideoUrl] = useState(null);
    const [uploading, setUploading] = useState('Kéo hoặc nhấn vào đây để tải video lên!');
    const urlAvatar = useSelector((state) => state.imageAvatar);
    const [thumbnailsurl, setThumbnailsurl] = useState('');
    const [videoInfo, setVideoInfo] = useState({
        title: '',
        description: '',
        channelAvatar: '',
        thumbnailsurl: '',
        firebaseID: '',
    });
    const avatar =
        'https://img.freepik.com/free-icon/user_318-159711.jpg?size=626&ext=jpg&ga=GA1.1.614860776.1689582553&semt=sph';

    const [check, setCheck] = useState();

    const dispatch = useDispatch();
    const onDrop = useCallback(
        async (acceptedFiles) => {
            const acceptedVideoTypes = ['video/mp4'];

            const file = acceptedFiles[0];

            if (!acceptedVideoTypes.includes(file.type)) {
                toast.error('Chỉ chấp nhận tệp video có định dạng mp4', {
                    autoClose: 3000,
                    position: 'top-right',
                });
                return;
            }

            setUploading(<ClipLoader color="#36D7B7" loading={uploading} size={30} />);
            const video = uuidv4();
            const videoName = `video_${video}.mp4`;
            const avatarRef = ref(storage, `${userInfo?.email}/${videoName}`);

            await uploadBytes(avatarRef, file);

            const downloadUrl = await getDownloadURL(avatarRef);

            setVideoUrl(downloadUrl);

            toast.success(`Tải lên video thành công`, {
                autoClose: 3000,
                position: 'top-right',
            });
            setUploading('tệp đã tải lên thành công hoàn thành các bước tiếp theo để tải video lên...');
        },
        [uploading, userInfo?.email],
    );
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
                position: 'top-right',
            });
        } else if (!check) {
            toast.error('Vui lòng nhập đầy đủ thông tin', {
                autoClose: 3000,
                position: 'top-right',
            });
        } else {
            const currentDate = new Date();
            const currentTime = currentDate.toISOString();
            const videoid = uuidv4();
            const videoData = {
                ...videoInfo,
                video: videoUrl,
                videoId: videoid,
                thumbnailsurl: thumbnailsurl,
                timestamp: currentTime,
                firebaseID: urlAvatar.firebaseId,
                channelAvatar: urlAvatar?.urlAvatar || avatar,
                like: '0',
                dislike: '0',
                channelTitle: userInfo.channelInfo,
            };

            const videosCollectionRef = collection(db, 'videos');
            await addDoc(videosCollectionRef, videoData);
            dispatch({ type: VIDEO_UPDATE_SUCCESS, payload: videoData });
            toast.success('Đăng video thành công', {
                autoClose: 3000,
                position: 'top-right',
            });

            setVideoInfo({
                title: '',
                description: '',
            });
            setVideoUrl(null);
            setTimeout(() => {
                navigate('/uploadusers');
            }, 3000);
        }
    };
    useEffect(() => {
        const canPublishNow =
            videoInfo.title.trim() !== '' &&
            videoInfo.description.trim() !== '' &&
            videoUrl !== null &&
            videoUrl !== '' &&
            thumbnailsurl !== null &&
            thumbnailsurl !== '';

        setCheck(canPublishNow);
    }, [videoInfo, videoUrl, thumbnailsurl]);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    return (
        <div className="fileupload">
            <div className="fileupload_form">
                <h2>Chi tiết:</h2>
                <div className="fileupload__form-wrapper">
                    <input
                        type="text"
                        name="title"
                        value={videoInfo.title}
                        onChange={handleInputChange}
                        placeholder="Tiêu đề"
                    />
                    <textarea
                        name="description"
                        value={videoInfo.description}
                        onChange={handleInputChange}
                        placeholder="Mô tả"
                    ></textarea>
                </div>
                <div className="uploadImg__wrapper">
                    <label htmlFor="image">Chọn ảnh bìa video</label>
                    <p>Ảnh bìa sẽ hiển thị dưới dạng xem trước khi video của bạn được tải lên</p>
                    <div className="preview__img">
                        <input
                            type="file"
                            accept="image/*"
                            id="image"
                            onChange={handleThumbnailChange}
                            style={{ display: 'none' }}
                        />
                        <label for="image" className="uploadImg__btn smooth">
                            <AiOutlineCloudUpload />
                            <span>Tải ảnh lên</span>
                        </label>
                        {thumbnailsurl && <img src={thumbnailsurl} alt="" className="imgUp" />}
                    </div>
                </div>
                <br />
                <button className="smooth" onClick={handlePublish}>
                    Đăng video
                </button>
                <Link to="/" className="linkUp">
                    Trở về{' '}
                </Link>
            </div>
            <div className="fileupload__video-wrapper">
                {!videoUrl ? (
                    <div>
                        <div className="upload__title center">
                            <h4>Tải lên video của bạn</h4>
                            <span>File có định dạng .mp4, .mkv</span>
                        </div>
                        <div {...getRootProps()} className="fileupload_dropzoneStyle">
                            <input {...getInputProps()} />
                            <div className="zone-upload">
                                <button className="smooth">
                                    <img className="upload-img" src={UploadVideoIcon} alt="" />
                                </button>
                                <p>{uploading}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    videoUrl && (
                        <div className="videoPreview__wrapper">
                            <div className="videoPreview__title">
                                <span>Bản xem trước</span>
                                <button
                                    className="smooth"
                                    onClick={() => {
                                        setUploading('Kéo hoặc nhấn vào đây để tải video lên!');
                                        setVideoUrl(null);
                                    }}
                                >
                                    Hủy bỏ
                                </button>
                            </div>
                            <div className="videoPreview__container">
                                <video src={videoUrl} controls height={200} className="videoup" />
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default VideoUploader;
