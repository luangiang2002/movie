import React, { useState } from 'react';
import './Avatar.scss';
import { IoMdExit } from 'react-icons/io';
import { BsMoon } from 'react-icons/bs';
import Interface from './Interface/Interface';
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
    const urlAvatar = useSelector((state) => state.imageAvatar);

    const handleShowDeviceInterface = () => {
        setShowDeviceInterface(!showDeviceInterface);
    };
    const handleLogout = async () => {
        try {
            await auth.signOut();
            localStorage.removeItem('watch-user');
            window.location.reload();
        } catch (error) {
            toast.error('Đăng xuất không thành công, vui lòng thử lại!', {
                autoClose: 3000,
                position: 'top-right',
            });
        }
    };

    const handleAvatarChange = async (event) => {
        if (!event.target || !event.target.files || event.target.files.length === 0) {
            toast.warning('Ảnh đại diện đã được sử dụng', {
                autoClose: 3000,
                position: 'top-right',
            });
            return;
        }
        const file = event.target.files[0];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'jfif'];

        if (!validExtensions.includes(fileExtension)) {
            toast.error('Định dạng ảnh không hợp lệ, vui lòng sử dụng định dạng : jpg, jpeg,png,gif,jfif ', {
                autoClose: 3000,
                position: 'top-right',
            });
            return;
        }
        try {
            const avatarRef = ref(storage, `${userInfo.email}/avatar.${fileExtension}`);
            await uploadBytes(avatarRef, file);
            const downloadUrl = await getDownloadURL(avatarRef);
            const docRef = doc(db, 'users', urlAvatar.firebaseId);
            await updateDoc(docRef, {
                image: downloadUrl,
            });

            dispatch({ type: UPDATE_AVATAR, payload: downloadUrl });

            toast.success(`Cập nhật Avatar thành công`, {
                autoClose: 3000,
                position: 'top-right',
            });
        } catch (error) {
            toast.error(`Lỗi khi cập nhập`, {
                autoClose: 4000,
                position: 'top-right',
            });
        }
    };

    return (
        <>
            {showDeviceInterface ? (
                <Interface setShowDeviceInterface={setShowDeviceInterface} setDarkMode={setDarkMode} />
            ) : null}
            {!showDeviceInterface && (
                <>
                    <div className="avatar_icon">
                        <div>
                            <input type="file" accept="image/*" onChange={handleAvatarChange} id="file" />
                            <label className="update__avatar-btn" htmlFor="file">
                                <img
                                    src={
                                        urlAvatar?.urlAvatar
                                            ? urlAvatar.urlAvatar
                                            : 'https://img.freepik.com/free-icon/user_318-159711.jpg?size=626&ext=jpg&ga=GA1.1.614860776.1689582553&semt=sph'
                                    }
                                    alt="avater"
                                />
                            </label>
                        </div>
                        {userInfo ? <p className="userInfo__text">{userInfo.email}</p> : null}
                    </div>
                    <div className="avatar_logout" onClick={handleLogout}>
                        <IoMdExit />
                        <p>Đăng xuất</p>
                    </div>
                    <div className="avatar_theme" onClick={handleShowDeviceInterface}>
                        <div className="themr__wrapper">
                            <BsMoon />
                            <p>Giao diện thiết bị</p>
                        </div>
                        <button>
                            <MdNavigateNext />
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

export default Avatar;
