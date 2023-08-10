import { VIDEO_UPDATE_FAIL, VIDEO_UPDATE_REQUEST, VIDEO_UPDATE_SUCCESS } from '../actionType';

export const videoUpload = (comments) => async (dispatch) => {
    try {
        dispatch({
            type: VIDEO_UPDATE_REQUEST,
        });

        dispatch({
            type: VIDEO_UPDATE_SUCCESS,
            payload: comments,
        });
    } catch (error) {
        dispatch({
            type: VIDEO_UPDATE_FAIL,
            payload: error,
        });
    }
};
