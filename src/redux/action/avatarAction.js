import { doc, onSnapshot } from 'firebase/firestore';
import { getUserIdByEmail } from '../../Components/AvatarLogin/FirebaseData';
import {
    UPDATE_AVATAR,
    UPDATE_FIREBASE_ID,
    VIDEO_UPDATE_FAIL,
    VIDEO_UPDATE_REQUEST,
    VIDEO_UPDATE_SUCCESS,
} from '../actionType';
import { db } from '../../firebase/fibefire';

export const getVideoUpload = (videos) => async (dispatch) => {
    try {
        dispatch({
            type: VIDEO_UPDATE_REQUEST,
        });
        dispatch({
            type: VIDEO_UPDATE_SUCCESS,
            payload: {
                payload: videos,
            },
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: VIDEO_UPDATE_FAIL,
            payload: error.message,
        });
    }
};

export const getAvatar = (userInfo, avatarImage) => async (dispatch) => {
    try {
        if (userInfo && userInfo.email) {
            getUserIdByEmail(userInfo.email)
                .then((id) => {
                    const docRef = doc(db, 'users', id);
                    const unsubscribe = onSnapshot(docRef, (doc) => {
                        if (doc.exists()) {
                            const data = doc.data();
                            const newAvatarImage = data.image;
                            if (newAvatarImage !== avatarImage) {
                                dispatch({ type: UPDATE_AVATAR, payload: newAvatarImage });
                                dispatch({ type: UPDATE_FIREBASE_ID, payload: id });
                            }
                        } else {
                            const defaultAvatarImage =
                                'https://img.freepik.com/free-icon/user_318-159711.jpg?size=626&ext=jpg&ga=GA1.1.614860776.1689582553&semt=sph';
                            if (defaultAvatarImage !== avatarImage) {
                                dispatch({ type: UPDATE_AVATAR, payload: defaultAvatarImage });
                            }
                        }
                    });
                    return () => unsubscribe();
                })
                .catch((error) => {
                    console.error('Đã xảy ra lỗi:', error);
                });
        }
    } catch (error) {
        throw error;
    }
};
