import { UPDATE_AVATAR, UPDATE_FIREBASE_ID, VIDEO_UPDATE_SUCCESS } from "../actionType";

 const initialState = {
  firebaseId: '',
  videos:[],
  loading:true,
  urlAvatar: 'https://img.freepik.com/free-icon/user_318-159711.jpg?size=626&ext=jpg&ga=GA1.1.614860776.1689582553&semt=sph',
};

export const avatarReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIREBASE_ID:
      return {
        ...state,
        firebaseId: action.payload,
      };
    case UPDATE_AVATAR:
      return {
        ...state,
        urlAvatar: action.payload,
      };
    case VIDEO_UPDATE_SUCCESS:
      return {
        ...state,
        loading:false,
        videos: Array.isArray(action.payload) ? action.payload : state.videos,
      };
    default:
      return state;
  }
};

