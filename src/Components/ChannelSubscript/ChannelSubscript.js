import React, { useState, useEffect } from 'react';
import { getDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/fibefire';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChannelSubscript = ({ channelId, selectedVideo, userId, channelAvatar, channel, content, SubscribersCount }) => {
    const channelDescription = channel?.channelDescription || channel?.description;
    const [userSubscribed, setUserSubscribed] = useState(false);
    const [subscribersCount, setSubscribersCount] = useState(0);
    useEffect(() => {
        const subscriptionDocRef = doc(db, 'channelSubscriptions', `${channelId}`);
        const fetchSubscription = async () => {
            try {
                const subscriptionDocSnapshot = await getDoc(subscriptionDocRef);
                if (subscriptionDocSnapshot.exists()) {
                    const data = subscriptionDocSnapshot.data();
                    setSubscribersCount(data.subscribersCount || 0);
                    if (data.userIds && data.userIds.includes(userId)) {
                        setUserSubscribed(true);
                    }
                } else {
                    setUserSubscribed(false);
                    setSubscribersCount(0);
                }
            } catch (error) {
                throw error;
            }
        };

        fetchSubscription();
    }, [channelId, userId]);

    const handleToggleSubscription = async () => {
        if (!userId) {
            toast.error('Bạn cần đăng nhập để đăng ký kênh', {
                autoClose: 3000,
                position: 'top-right',
            });
            return;
        }

        const subscriptionDocRef = doc(db, 'channelSubscriptions', `${channelId}`);

        try {
            const subscriptionDocSnapshot = await getDoc(subscriptionDocRef);

            if (!subscriptionDocSnapshot.exists()) {
                await setDoc(subscriptionDocRef, {
                    channelTitle: selectedVideo?.channelTitle,
                    channelId: channelId,
                    userIds: [userId],
                    subscribersCount: SubscribersCount || 1,
                    channelAvatar: channelAvatar,
                    channelDescription: channelDescription,
                    content: content,
                });
                setUserSubscribed(true);
                setSubscribersCount(1);
            } else {
                const data = subscriptionDocSnapshot.data();
                const updatedUserIds = userSubscribed
                    ? data.userIds.filter((id) => id !== userId)
                    : [...data.userIds, userId];

                await updateDoc(subscriptionDocRef, {
                    userIds: updatedUserIds,
                    subscribersCount: userSubscribed ? data.subscribersCount - 1 : data.subscribersCount + 1,
                });

                setUserSubscribed(!userSubscribed);
                setSubscribersCount(userSubscribed ? subscribersCount - 1 : subscribersCount + 1);
            }
        } catch (error) {
            console.error('Error toggling subscription:', error);
        }
    };

    return (
        <div>
            {userId ? (
                userSubscribed ? (
                    <button className="dissubcript" onClick={handleToggleSubscription}>
                        Hủy đăng ký
                    </button>
                ) : (
                    <button className="subcript" onClick={handleToggleSubscription}>
                        Đăng ký
                    </button>
                )
            ) : (
                <button className="subcript" onClick={handleToggleSubscription}>
                    Đăng ký
                </button>
            )}
        </div>
    );
};

export default ChannelSubscript;
