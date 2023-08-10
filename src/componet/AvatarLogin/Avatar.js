import React, { useState } from 'react';
import './avatar.scss';
import { IoMdExit } from 'react-icons/io';
import { BsMoon } from 'react-icons/bs';
import { LuLanguages } from 'react-icons/lu';
import Interface from './interface/Interface';
import Language from './Language/Language';
import { auth, db, storage } from '../../firebase/fibefire';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { MdNavigateNext } from 'react-icons/md';
import { UPDATE_AVATAR } from '../../redux/actionType';
const Avatar = ({ userInfo, setDarkMode }) => {
    const dispatch = useDispatch();
    const [showDeviceInterface, setShowDeviceInterface] = useState(false);
    const [showhandleLanguage, setShowhandleLanguage] = useState(false);
    const urlAvatar = useSelector((state) => state.imageAvatar);

    const handleShowDeviceInterface = () => {
        setShowDeviceInterface(!showDeviceInterface);
    };

    const handleLanguage = () => {
        setShowhandleLanguage(!showhandleLanguage);
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            localStorage.removeItem('watch-user');
            window.location.reload();
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
        }
    };

    const handleAvatarChange = async (event) => {
        if (!event.target || !event.target.files || event.target.files.length === 0) {
            alert('Ảnh đại diện đã dùng ');
            return;
        }
        const file = event.target.files[0];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'jfif'];

        if (!validExtensions.includes(fileExtension)) {
            toast.error('định dạng ảnh không hợp lệ, vui lòng sử dụng định dạng : jpg, jpeg,png,gif,jfif ', {
                autoClose: 3000,
                position: 'top-left',
            });
            return;
        }
        try {
            const avatarRef = ref(storage, `${userInfo.email}/avatar.${fileExtension}`);
            // Lưu ảnh đại diện vào Firebase Storage
            await uploadBytes(avatarRef, file);
            // Lấy URL của ảnh đại diện từ Firebase Storage
            const downloadUrl = await getDownloadURL(avatarRef);
            const docRef = doc(db, 'users', urlAvatar.firebaseId);
            await updateDoc(docRef, {
                image: downloadUrl,
            });

            // Cập nhật hình đại diện trong Redux Store
            dispatch({ type: UPDATE_AVATAR, payload: downloadUrl });

            toast.success(`Cập nhật Avatar thành công`, {
                autoClose: 3000,
                position: 'top-left',
            });
        } catch (error) {
            toast.error(`Lỗi khi cập nhập`, {
                autoClose: 4000,
                position: 'top-right',
            });
            console.log(error);
        }
    };

    return (
        <>
            {showDeviceInterface ? (
                <Interface setShowDeviceInterface={setShowDeviceInterface} setDarkMode={setDarkMode} />
            ) : null}

            {showhandleLanguage ? <Language setShowhandleLanguage={setShowhandleLanguage} /> : null}

            {!showDeviceInterface && !showhandleLanguage && (
                <>
                    <div className="avatar_icon">
                        <div>
                            {urlAvatar?.urlAvatar ? (
                                <img src={urlAvatar?.urlAvatar} alt="avater" />
                            ) : (
                                <img
                                    src="https://img.freepik.com/free-icon/user_318-159711.jpg?size=626&ext=jpg&ga=GA1.1.614860776.1689582553&semt=sph"
                                    alt="default_avater"
                                />
                            )}
                            {userInfo ? <p>{userInfo.email}</p> : null}
                        </div>
                        <input type="file" accept="image/*" onChange={handleAvatarChange} id="file" />
                        <label htmlFor="file">New Avatar</label>
                    </div>
                    <div className="avatar_logout" onClick={handleLogout}>
                        <IoMdExit />
                        <p>Đăng xuất</p>
                    </div>
                    <div className="avatar_langue" onClick={handleShowDeviceInterface}>
                        <BsMoon />
                        <p>
                            Giao diện thiết bị <MdNavigateNext />
                        </p>
                    </div>
                    <div className="avatar_langue" onClick={handleLanguage}>
                        <LuLanguages />
                        <p>
                            Ngôn ngữ giao diện <MdNavigateNext />
                        </p>
                    </div>
                </>
            )}
        </>
    );
};

export default Avatar;
