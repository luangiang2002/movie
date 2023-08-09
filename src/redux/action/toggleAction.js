import { request } from "../../rapidApi/api"
import { SHORT_LIST_FAIL, SHORT_LIST_REQUEST, SHORT_LIST_SUCCESS } from "../actionType"
export const getShort = (id) => async (dispatch) => {
    const now = new Date();
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    try {
        dispatch({
            type: SHORT_LIST_REQUEST,
        })
        const res = await request.get(`/search`, {
            params: {
                part: 'snippet',
                maxResults: '20',
                type: 'video',
                videoDuration: 'short',
                order: 'date',
                publishedAfter: oneMonthAgo.toISOString()
            },
        }
        )
        dispatch({
            type: SHORT_LIST_SUCCESS,
            payload: {
                short: res.data.items,
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: SHORT_LIST_FAIL,
            payload: error.message
        })
    }
}
