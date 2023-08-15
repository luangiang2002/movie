import { short } from '../../rapidApi/api';
import { SHORT_LIST_FAIL, SHORT_LIST_REQUEST, SHORT_LIST_SUCCESS } from '../actionType';
export const getShort = (id) => async (dispatch) => {
    try {
        dispatch({
            type: SHORT_LIST_REQUEST,
        });
        const res = await short.get(`/search`, {
            params: {
                query: 'tiktok',
                geo: 'US',
                lang: 'en',
                type: 'video',
                duration: 'short',
                upload_date: 'month',
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
