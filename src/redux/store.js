import { createStore, applyMiddleware, combineReducers } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {  ChannelReducer, VideoCHANNEL, VideoComment, VideoDetail, VideoReducer, selectedVideoReducer } from './reducer/videoReducer'
import { ShortReducer } from './reducer/ToggleReducer'
import avatarReducer from './reducer/avatarReducer'

const rootReducer = combineReducers({
    
    search:selectedVideoReducer,
    videowatch:VideoReducer,
    comment:VideoComment,
    videoChannel:VideoCHANNEL,
    videoDetail:VideoDetail,
    short:ShortReducer,
    imageAvatar:avatarReducer,
    channel:ChannelReducer,
})


const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;