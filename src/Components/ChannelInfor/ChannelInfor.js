import React, { useEffect, useState } from 'react';
import './ChannelInfor.scss';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/fibefire';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
const ChannelInfor = ({ userInfo, firebaseId }) => {
    const navigate = useNavigate();
    const [channelName, setChannelName] = useState('');
    const [channelDescription, setChannelDescription] = useState('');
    const [error, setError] = useState('');

    const currentDate = new Date();
    const currentTime = currentDate.toISOString();

    const handleSaveChannelInfo = async () => {
        if (!channelName || !channelDescription) {
            setError('Vui lòng nhập tên kênh và mô tả kênh.');
            return;
        }

        setError('');
        const username = userInfo.email.split('@')[0];
        const channelId = uuidv4();

        const uniqueId = `${channelId}_${username}`;

        if (userInfo && channelName && channelDescription) {
            const channelData = {
                firebaseID: firebaseId,
                channelID: uniqueId,
                email: userInfo.email,
                channelInfo: channelName,
                channelDescription: channelDescription,
                timestamp: currentTime,
            };

            const channelRef = collection(db, 'channel');
            await addDoc(channelRef, channelData);

            const userDocRef = doc(db, 'users', firebaseId);
            await updateDoc(userDocRef, { channelInfo: channelName });

            navigate('/upload');
        }
    };
    const onFocusInput = () => {
        setError('');
    };
    useEffect(() => {
        if (userInfo) {
            const updatedUserInfo = { ...userInfo, channelInfo: channelName };
            localStorage.setItem('watch-user', JSON.stringify(updatedUserInfo));
        }
    }, [channelName, userInfo]);

    return (
        <div className="ChannelInfor">
            <h4>Nhập thông tin của kênh</h4>
            <div className="channelInfor_content">
                <p>tên kênh</p>
                <input
                    type="text"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    onFocus={onFocusInput}
                />
                <p>Giới thiệu</p>
                <input
                    type="text"
                    value={channelDescription}
                    onChange={(e) => setChannelDescription(e.target.value)}
                    onFocus={onFocusInput}
                />
                {error && <span className="error-message">{error}</span>}
                <button onClick={handleSaveChannelInfo}>Lưu thông tin kênh</button>
            </div>
        </div>
    );
};

export default ChannelInfor;
