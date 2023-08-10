import { request } from '../../rapidApi/api';
import {
    CHANNEL_VIDEO_FAIL,
    CHANNEL_VIDEO_REQUEST,
    CHANNEL_VIDEO_SUCCESS,
    RELATED_VIDEO_FAIL,
    RELATED_VIDEO_REQUEST,
    RELATED_VIDEO_SUCCESS,
    SEARCH_VIDEO_FAIL,
    SEARCH_VIDEO_REQUEST,
    SEARCH_VIDEO_SUCCESS,
    VIDEO_VIDEOID_FAILURE,
    VIDEO_VIDEOID_REQUEST,
    VIDEO_VIDEOID_SUCCESS,
} from '../actionType';

export const getVideoByCategory = (keyword) => async (dispatch) => {
    try {
        dispatch({
            type: SEARCH_VIDEO_REQUEST,
        });
        const res = await request.get(`/search`, {
            params: {
                q: keyword,
                part: 'snippet,id',
                regionCode: 'US',
                maxResults: '40',
            },
        });
        dispatch({
            type: SEARCH_VIDEO_SUCCESS,
            payload: {
                video: res.data.items,
                ActiveCategory: keyword,
            },
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: SEARCH_VIDEO_FAIL,
            payload: error.message,
        });
    }
};

export const getVideoWatch = (id) => async (dispatch) => {
    try {
        dispatch({
            type: RELATED_VIDEO_REQUEST,
        });
        const res = await request.get(`/search`, {
            params: {
                channelId: id,
                part: 'snippet,id',
                maxResults: '40',
            },
        });
        dispatch({
            type: RELATED_VIDEO_SUCCESS,
            payload: {
                video: res.data.items,
            },
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: RELATED_VIDEO_FAIL,
            payload: error.message,
        });
    }
};

export const getPlaylist = (id) => async (dispatch) => {
    try {
        dispatch({
            type: CHANNEL_VIDEO_REQUEST,
        });
        const res = await request.get(`/playlistItems`, {
            params: {
                playlistId: id,
                part: 'snippet',
                maxResults: '30',
            },
        });
        dispatch({
            type: CHANNEL_VIDEO_SUCCESS,
            payload: {
                channel: res.data.items,
            },
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: CHANNEL_VIDEO_FAIL,
            payload: error.message,
        });
    }
};

export const getChannel = (id) => async (dispatch) => {
    try {
        dispatch({
            type: CHANNEL_VIDEO_REQUEST,
        });
        const res = await request.get(`/channels`, {
            params: {
                part: 'snippet',
                id: id,
                maxResults: '40',
            },
        });
        dispatch({
            type: CHANNEL_VIDEO_SUCCESS,
            payload: {
                channel: res.data.items,
            },
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: CHANNEL_VIDEO_FAIL,
            payload: error.message,
        });
    }
};
export const getVideoId = (id) => async (dispatch) => {
    try {
        dispatch({
            type: VIDEO_VIDEOID_REQUEST,
        });
        const res = await request.get(`/videos`, {
            params: {
                part: 'snippet',
                id: id,
                maxResults: '40',
            },
        });
        dispatch({
            type: VIDEO_VIDEOID_SUCCESS,
            payload: {
                videoid: res.data.items,
            },
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: VIDEO_VIDEOID_FAILURE,
            payload: error.message,
        });
    }
};
