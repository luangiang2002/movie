import { CHANNEL_ID_REQUEST, CHANNEL_VIDEO_FAIL, CHANNEL_VIDEO_REQUEST, CHANNEL_VIDEO_SUCCESS, COMMENT_LIST_FAIL, COMMENT_LIST_REQUEST, COMMENT_LIST_SUCCESS, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, RELATED_VIDEO_SUCCESS, SEARCH_VIDEO_FAIL, SEARCH_VIDEO_REQUEST, SEARCH_VIDEO_SUCCESS, VIDEO_DETAILS_FAIL, VIDEO_DETAILS_REQUEST, VIDEO_DETAILS_SUCCESS} from "../actionType";


export const selectedVideoReducer = (state = {video: [],loading: true, ActiveCategory: 'Tất cả'}, action)=>{
    const {payload,type}=action

    switch (type) {
        case SEARCH_VIDEO_REQUEST:
            return {
                ...state,
                loading:true
            }
        case SEARCH_VIDEO_SUCCESS:
            return{
                ...state,
                video:payload,
                loading:false,
                ActiveCategory: payload.category
            }
        case SEARCH_VIDEO_FAIL:
            return{
                ...state,
                video:null,
                error:payload
            }
    
        default:
            return state;
    }
}

export const VideoReducer = (state = {video: [],loading: true, }, action)=>{
    const {payload,type}=action

    switch (type) {
        case RELATED_VIDEO_REQUEST:
            return {
                ...state,
                loading:true
            }
        case RELATED_VIDEO_SUCCESS:
            return{
                ...state,
                video:payload,
                loading:false,
            }
        case RELATED_VIDEO_FAIL:
            return{
                ...state,
                video:null,
                error:payload
            }
    
        default:
            return state;
    }
}

export const VideoComment = (state = {comment: [],loading: true,}, action)=>{
    const {payload,type}=action

    switch (type) {
        case COMMENT_LIST_REQUEST:
            return {
                ...state,
                loading:true
            }
        case COMMENT_LIST_SUCCESS:
            return{
                ...state,
                comment:payload,
                loading:false,
            }
        case COMMENT_LIST_FAIL:
            return{
                ...state,
                video:null,
                error:payload
            }
    
        default:
            return state;
    }
}
export const VideoCHANNEL = (state = {channel: [],loading: true,}, action)=>{
    const {payload,type}=action

    switch (type) {
        case CHANNEL_VIDEO_REQUEST:
            return {
                ...state,
                loading:true
            }
        case CHANNEL_VIDEO_SUCCESS:
            return{
                ...state,
                channel:payload,
                loading:false,
            }
        case CHANNEL_VIDEO_FAIL:
            return{
                ...state,
                video:null,
                error:payload
            }
    
        default:
            return state;
    }
}
export const VideoDetail = (state = {videos: [],loading: true,}, action)=>{
    const {payload,type}=action

    switch (type) {
        case VIDEO_DETAILS_REQUEST:
            return {
                ...state,
                loading:true
            }
        case VIDEO_DETAILS_SUCCESS:
            return{
                ...state,
                videos:payload,
                loading:false,
            }
        case VIDEO_DETAILS_FAIL:
            return{
                ...state,
                video:null,
                error:payload
            }
    
        default:
            return state;
    }
}
export const ChannelReducer = (state = {channel: [],loading: true,}, action)=>{
    const {payload,type}=action

    switch (type) {
        case CHANNEL_ID_REQUEST:
            return {
                ...state,
                loading:true
            }
        case CHANNEL_VIDEO_SUCCESS:
            return{
                ...state,
                channel:payload,
                loading:false,
            }
        case CHANNEL_VIDEO_FAIL:
            return{
                ...state,
                channel:null,
                error:payload
            }
    
        default:
            return state;
    }
}
