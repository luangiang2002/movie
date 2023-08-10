import { VIDEO_COMMENT_FAILURE, VIDEO_COMMENT_REQUEST, VIDEO_COMMENT_SUCCESS } from '../actionType';
export const CommentAction = (comments) => async (dispatch) => {
    try {
        dispatch({
            type: VIDEO_COMMENT_REQUEST,
        });

        dispatch({
            type: VIDEO_COMMENT_SUCCESS,
            payload: comments,
        });
    } catch (error) {
        dispatch({
            type: VIDEO_COMMENT_FAILURE,
            payload: error,
        });
    }
};
