import { short } from '../../rapidApi/api';
import { SHORT_LIST_FAIL, SHORT_LIST_REQUEST, SHORT_LIST_SUCCESS } from '../actionType';
export const getShort = (id) => async (dispatch) => {
    try {
        dispatch({
            type: SHORT_LIST_REQUEST,
        });
        const res = await short.get(`/search`, {
            params: {
                query: 'hottren',
                geo: 'VN',
                lang: 'vi-VN',
                duration: 'short',
                upload_date: 'today',
                type: 'video',
            },
        });
        dispatch({
            type: SHORT_LIST_SUCCESS,
            payload: {
                short: res.data.data,
            },
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: SHORT_LIST_FAIL,
            payload: error.message,
        });
    }
};
