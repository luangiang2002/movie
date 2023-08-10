import {
    CHANNEL_ID_REQUEST,
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

export const selectedVideoReducer = (state = { video: [], loading: true, ActiveCategory: 'All' }, action) => {
    const { payload, type } = action;

    switch (type) {
        case SEARCH_VIDEO_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SEARCH_VIDEO_SUCCESS:
            return {
                ...state,
                video: payload,
                loading: false,
                ActiveCategory: payload.category,
            };
        case SEARCH_VIDEO_FAIL:
            return {
                ...state,
                video: null,
                error: payload,
            };

        default:
            return state;
    }
};

export const VideoReducer = (state = { video: [], loading: true }, action) => {
    const { payload, type } = action;

    switch (type) {
        case RELATED_VIDEO_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case RELATED_VIDEO_SUCCESS:
            return {
                ...state,
                video: payload,
                loading: false,
            };
        case RELATED_VIDEO_FAIL:
            return {
                ...state,
                video: null,
                error: payload,
            };

        default:
            return state;
    }
};

export const VideoCHANNEL = (state = { channel: [], loading: true }, action) => {
    const { payload, type } = action;

    switch (type) {
        case CHANNEL_VIDEO_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CHANNEL_VIDEO_SUCCESS:
            return {
                ...state,
                channel: payload,
                loading: false,
            };
        case CHANNEL_VIDEO_FAIL:
            return {
                ...state,
                video: null,
                error: payload,
            };

        default:
            return state;
    }
};

export const ChannelReducer = (state = { channel: [], loading: true }, action) => {
    const { payload, type } = action;

    switch (type) {
        case CHANNEL_ID_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CHANNEL_VIDEO_SUCCESS:
            return {
                ...state,
                channel: payload,
                loading: false,
            };
        case CHANNEL_VIDEO_FAIL:
            return {
                ...state,
                channel: null,
                error: payload,
            };

        default:
            return state;
    }
};
export const VideoidReducer = (state = { videoid: [], loading: true }, action) => {
    const { payload, type } = action;

    switch (type) {
        case VIDEO_VIDEOID_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case VIDEO_VIDEOID_SUCCESS:
            return {
                ...state,
                videoid: payload,
                loading: false,
            };
        case VIDEO_VIDEOID_FAILURE:
            return {
                ...state,
                videoid: null,
                error: payload,
            };

        default:
            return state;
    }
};
