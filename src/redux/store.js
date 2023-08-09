import { createStore, applyMiddleware, combineReducers } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {  ChannelReducer, VideoCHANNEL, VideoComment, VideoDetail, VideoReducer, selectedVideoReducer } from './reducer/videoReducer'
import { ShortReducer } from './reducer/ToggleReducer'
import  { avatarReducer } from './reducer/avatarReducer'
import { commentReducer } from './reducer/commentReducer'
import { videoUploadReducer } from './reducer/VideoReuderApp'

const rootReducer = combineReducers({
    
    search:selectedVideoReducer,
    videowatch:VideoReducer,
    comment:VideoComment,
    videoChannel:VideoCHANNEL,
    videoDetail:VideoDetail,
    short:ShortReducer,
    imageAvatar:avatarReducer,
    channel:ChannelReducer,
    videosapp:videoUploadReducer,
    addcomment:commentReducer,
})


const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;