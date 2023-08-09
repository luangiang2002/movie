const initialState = {
  firebaseId: '',
  urlAvatar: 'https://img.freepik.com/free-icon/user_318-159711.jpg?size=626&ext=jpg&ga=GA1.1.614860776.1689582553&semt=sph',
};

const avatarReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_FIREBASE_ID':
      return {
        ...state,
        firebaseId: action.payload,
      };
    case 'UPDATE_AVATAR':
      return {
        ...state,
        urlAvatar: action.payload,
      };
    default:
      return state;
  }
};

export default avatarReducer;
