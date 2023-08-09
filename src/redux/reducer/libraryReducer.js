import { LIBRARY_DISLIKE, LIBRARY_LIKE, LIBRARY_SUBRIPTS, LIBRARY_VIDEO, VIDEO_UPLOAD_USERS } from "../actionType";

const initialState = {
    watchedVideos: [],
    likedVideos: [],
    subripts: [],
    DislikeVideos:[],
    loading:true
  };
  
  export const LibraryReducer= (state = initialState, action) => {
    switch (action.type) {
      case LIBRARY_VIDEO:
        return {
          ...state,
          watchedVideos: Array.isArray(action.payload) ? action.payload : state.watchedVideos,
          loading:false,
        };
      case LIBRARY_LIKE:
        return {
          ...state,
          likedVideos: Array.isArray(action.payload) ? action.payload : state.likedVideos,
          loading:false,
        };
      case LIBRARY_DISLIKE:
        return {
          ...state,
          DislikeVideos: Array.isArray(action.payload) ? action.payload : state.DislikeVideos,
          loading:false,
        };
      case LIBRARY_SUBRIPTS:
        return {
          ...state,
          subripts: Array.isArray(action.payload) ? action.payload : state.subripts,
          loading:false,
        };
      case VIDEO_UPLOAD_USERS:
        return {
          ...state,
          subripts: Array.isArray(action.payload) ? action.payload : state.subripts,
          loading:false,
        };
      default:
        return state;
    }
  };
  

const initial= {
    videos:[],
    loading:true
  };
  
  export const uploadVideoReducer= (state = initial, action) => {
    switch (action.type) {
      case VIDEO_UPLOAD_USERS:
        return {
          ...state,
          videos: Array.isArray(action.payload) ? action.payload : state.videos,
          loading:false,
        };
      default:
        return state;
    }
  };
  