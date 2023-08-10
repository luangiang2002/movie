import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './componet/HomePage';
import { useEffect, useState } from 'react';
import SingUp from './authentica/SingUp';
import Singout from './authentica/Singout';
import ResetPassword from './authentica/ResetPassword';
import Login from './authentica/Login';
import SearchVideo from './componet/search/SearchVideo';
import HomeVideo from './componet/watchvideo/HomeVideo';
import Channel from './componet/channelVideo/Channel';
import Short from './componet/short/Short';
import { useDispatch, useSelector } from 'react-redux';
import Header from './componet/header/Header';
import ToggleSideBar from './componet/sidebar/ToggleSideBar';
import UploadVideo from './componet/UploadVideo/UploadVideo';
import ComponetnError from './componet/componenError/ComponetnError';
import HomeApp from './componet/App/HomeApp/HomeApp';
import VideoApp from './componet/App/HomeApp/videoApp/VideoApp';
import Library from './componet/Lirbary/Library';
import VideoAll from './componet/Lirbary/libraryVideoAll/VideoAll';
import LikeAll from './componet/Lirbary/libraryVideoAll/LikeAll';
import DisLikeAll from './componet/Lirbary/libraryVideoAll/DislikeAll';
import Subscript from './componet/videosubscriptions/Subscript';
import VideoUploadUsers from './componet/VideoUploadUsers/VideoUploadUsers';
import ChannelApp from './componet/App/channelapp/ChannelApp';
import { getAvatar } from './redux/action/avatarAction';
import { getSubscriptVideosForUser, getWatchedVideosForUser } from './redux/action/libraryAction';

function App() {
    const [sidebar, toggleSidebar] = useState(false);
    const [hideHeader, setHideHeader] = useState(false);
    const location = useLocation();
    const handleToggleSidebar = () => toggleSidebar((value) => !value);
    const dispatch = useDispatch();
    const userInfo = JSON.parse(localStorage.getItem('watch-user'));
    const avatarChannel = useSelector((state) => state.imageAvatar);
    const { firebaseId } = useSelector((state) => state.imageAvatar);
    const video = useSelector((state) => state.library);
    const navigate = useNavigate();

    const handleVideoClick = async (videoID) => {
        navigate(`/videoapp/${videoID.videoId}`);
    };
    const hadleYoutube = async (videoID) => {
        navigate(`/homevideo/${videoID.videoId}`);
    };
    useEffect(() => {
        dispatch(getWatchedVideosForUser(firebaseId));
        dispatch(getSubscriptVideosForUser(firebaseId));
    }, [dispatch, firebaseId]);

    useEffect(() => {
        dispatch(getAvatar(userInfo, avatarChannel.urlAvatar));
    }, [dispatch, userInfo, avatarChannel.urlAvatar]);

    useEffect(() => {
        const hideHeaderOnLoginAndSignup = ['/login', '/signup', 'signout', '/reset'].includes(location.pathname);
        setHideHeader(hideHeaderOnLoginAndSignup);
    }, [location]);
    const [isDarkMode, setDarkMode] = useState(false);
    return (
        <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
            {!hideHeader && <Header handleToggleSidebar={handleToggleSidebar} setDarkMode={setDarkMode} />}
            <ToggleSideBar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
            <Routes>
                <Route
                    path="/"
                    element={<HomePage handleToggleSidebar={handleToggleSidebar} sidebar={sidebar}></HomePage>}
                ></Route>
                <Route
                    path="/homevideo/:id"
                    element={<HomeVideo handleToggleSidebar={handleToggleSidebar} sidebar={sidebar}></HomeVideo>}
                ></Route>
                <Route
                    path="/channel/:id"
                    element={<Channel handleToggleSidebar={handleToggleSidebar} sidebar={sidebar}></Channel>}
                ></Route>
                <Route
                    path="/search/:id"
                    element={<SearchVideo handleToggleSidebar={handleToggleSidebar} sidebar={sidebar}></SearchVideo>}
                ></Route>
                <Route
                    path="/sort"
                    element={<Short handleToggleSidebar={handleToggleSidebar} sidebar={sidebar}></Short>}
                ></Route>

                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<SingUp />}></Route>
                <Route path="/signout" element={<Singout />}></Route>
                <Route path="/reset" element={<ResetPassword />}></Route>

                <Route path="/upload" element={<UploadVideo />}></Route>
                <Route path="/modal" element={<ComponetnError />}></Route>
                <Route path="/homeapp" element={<HomeApp />}></Route>
                <Route path="/videoapp/:id" element={<VideoApp />}></Route>

                <Route path="/library/" element={<Library />}></Route>
                <Route
                    path="/videoall/"
                    element={
                        <VideoAll videov={video} handleVideoClickv={handleVideoClick} hadleYoutubev={hadleYoutube} />
                    }
                ></Route>
                <Route
                    path="/likeall/"
                    element={
                        <LikeAll videol={video} handleVideoClickl={handleVideoClick} hadleYoutubel={hadleYoutube} />
                    }
                ></Route>
                <Route
                    path="/dislikeall/"
                    element={
                        <DisLikeAll videos={video} handleVideoClicks={handleVideoClick} hadleYoutubes={hadleYoutube} />
                    }
                ></Route>

                <Route
                    path="/subscript/"
                    element={
                        <Subscript
                            videosb={video}
                            handleVideoClicksb={handleVideoClick}
                            hadleYoutubesb={hadleYoutube}
                        />
                    }
                ></Route>
                <Route path="/channelapp/:id" element={<ChannelApp />}></Route>
                <Route path="/uploadusers/" element={<VideoUploadUsers />}></Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
        </div>
    );
}

export default App;
