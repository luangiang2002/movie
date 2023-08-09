import { VIDEO_UPDATE_FAIL, VIDEO_UPDATE_REQUEST, VIDEO_UPDATE_SUCCESS } from "../actionType";

const initialState = {
    videos: [], 
    loading: false, 
    error: null, 
  };
  
  export const videoUploadReducer = (state = initialState, action) => {
    switch (action.type) {
      case VIDEO_UPDATE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case VIDEO_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false,
          videos: Array.isArray(action.payload) ? action.payload : state.videos,
        };
      case VIDEO_UPDATE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };