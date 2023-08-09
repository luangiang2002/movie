import { VIDEO_UPDATE_FAIL, VIDEO_UPDATE_REQUEST, VIDEO_UPDATE_SUCCESS } from "../actionType"

export const getVideoUpload = (videos) => async (dispatch) => {
    try {
        dispatch({
            type: VIDEO_UPDATE_REQUEST,
        })
        dispatch({
            type: VIDEO_UPDATE_SUCCESS,
            payload: {
                payload:videos
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: VIDEO_UPDATE_FAIL,
            payload: error.message
        })
    }
}