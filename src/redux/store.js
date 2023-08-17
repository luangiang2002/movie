import { createStore, applyMiddleware, combineReducers } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
    ChannelReducer,
    VideoCHANNEL,
    VideoReducer,
    VideoidReducer,
    homeVideoReducer,
    selectedVideoReducer,
} from './reducer/videoReducer';
import { ShortReducer } from './reducer/ToggleReducer';
import { avatarReducer } from './reducer/avatarReducer';
import { commentReducer } from './reducer/commentReducer';
import { videoUploadReducer } from './reducer/VideoReuderApp';
import { LibraryReducer } from './reducer/libraryReducer';

const rootReducer = combineReducers({
    search: selectedVideoReducer,
    videowatch: VideoReducer,
    videoChannel: VideoCHANNEL,
    short: ShortReducer,
    imageAvatar: avatarReducer,
    channel: ChannelReducer,
    videosapp: videoUploadReducer,
    addcomment: commentReducer,
    library: LibraryReducer,
    videoid: VideoidReducer,
    homeVideos: homeVideoReducer,
});

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(thunk)));

export default store;
