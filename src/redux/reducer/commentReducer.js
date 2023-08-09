import { VIDEO_COMMENT_FAILURE, VIDEO_COMMENT_REQUEST, VIDEO_COMMENT_SUCCESS } from "../actionType";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIDEO_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case VIDEO_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: Array.isArray(action.payload) ? action.payload : state.comments,
      };
    case VIDEO_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};