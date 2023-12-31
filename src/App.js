import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './Components/HomePage';
import { useEffect, useState } from 'react';
import SingUp from './Authentication/SingUp';
import Singout from './Authentication/Singout';
import ResetPassword from './Authentication/ResetPassword';
import Login from './Authentication/Login';
import SearchVideo from './Components/Search/SearchVideo';
import HomeVideo from './Components/WatchVideo/HomeVideo';
import Short from './Components/Short/Short';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Components/Header/Header';
import UploadVideo from './Components/UploadVideo/UploadVideo';
import HomeApp from './Components/App/HomeApp/HomeApp';
import VideoApp from './Components/App/HomeApp/VideoApp/VideoApp';
import Library from './Components/Lirbary/Library';
import VideoAll from './Components/Lirbary/libraryVideoAll/VideoAll';
import LikeAll from './Components/Lirbary/libraryVideoAll/LikeAll';
import DisLikeAll from './Components/Lirbary/libraryVideoAll/DislikeAll';
import Subscript from './Components/VideoSubscriptions/Subscript';
import VideoUploadUsers from './Components/VideoUploadUsers/VideoUploadUsers';
import ChannelApp from './Components/App/ChannelApp/ChannelApp';
import { getAvatar } from './redux/action/avatarAction';
import { getSubscriptVideosForUser, getWatchedVideosForUser } from './redux/action/libraryAction';
import ToggleSideBar from './Components/Sidebar/ToggleSideBar';
import Channel from './Components/Channel/Channel';
import { db } from './firebase/fibefire';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
import ChannelInfor from './Components/ChannelInfor/ChannelInfor';
import { changeTheme } from './redux/action/themeAction';

function App() {
    const [SlideBar, toggleSidebar] = useState(false);
    const [hideHeader, setHideHeader] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const location = useLocation();
    const dispatch = useDispatch();
    const { mode } = useSelector((state) => state.theme);
    const avatarChannel = useSelector((state) => state.imageAvatar);
    const { firebaseId } = useSelector((state) => state.imageAvatar);
    const video = useSelector((state) => state.library);
    const userInfo = JSON.parse(localStorage.getItem('watch-user'));
    const navigate = useNavigate();

    const handleVideoClick = async (videoID) => {
        navigate(`/videoapp/${videoID.videoId}`);
    };
    const hadleYoutube = async (videoID) => {
        navigate(`/homevideo/${videoID.videoId}`);
    };

    const handleToggleSidebar = () => toggleSidebar((value) => !value);
    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };

    useEffect(() => {
        dispatch(getWatchedVideosForUser(firebaseId));
        dispatch(getSubscriptVideosForUser(firebaseId));
    }, [dispatch, firebaseId]);

    useEffect(() => {
        dispatch(getAvatar(userInfo, avatarChannel.urlAvatar));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, userInfo]);

    useEffect(() => {
        const hideHeaderOnLoginAndSignup = ['/login', '/signup', 'signout', '/reset'].includes(location.pathname);
        setHideHeader(hideHeaderOnLoginAndSignup);
    }, [location]);

    useEffect(() => {
        if (!firebaseId) {
            return;
        }
        const userDocRef = doc(db, 'users', firebaseId);

        getDoc(userDocRef).then((doc) => {
            if (doc.exists()) {
                const userInterfaceMode = doc.data().interfaceMode;
                userInterfaceMode ? dispatch(changeTheme(userInterfaceMode)) : dispatch(changeTheme('light'));
            }
        });
    }, [firebaseId]);

    return (
        <div className={`App ${mode !== 'light' ? 'dark-mode' : ''}`}>
            {!hideHeader && (
                <Header
                    handleToggleSidebar={handleToggleSidebar}
                    activeItem={activeItem}
                    handleItemClick={handleItemClick}
                />
            )}
            <ToggleSideBar
                SlideBar={SlideBar}
                handleToggleSidebar={handleToggleSidebar}
                activeItem={activeItem}
                handleItemClick={handleItemClick}
            />
            <main style={{ marginTop: '100px' }}>
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage handleToggleSidebar={handleToggleSidebar} SlideBar={SlideBar}></HomePage>}
                    ></Route>
                    <Route
                        path="/homevideo/:id"
                        element={<HomeVideo handleToggleSidebar={handleToggleSidebar} SlideBar={SlideBar}></HomeVideo>}
                    ></Route>
                    <Route
                        path="/channel/:id"
                        element={<Channel handleToggleSidebar={handleToggleSidebar} SlideBar={SlideBar}></Channel>}
                    ></Route>
                    <Route
                        path="/search/:id"
                        element={
                            <SearchVideo handleToggleSidebar={handleToggleSidebar} SlideBar={SlideBar}></SearchVideo>
                        }
                    ></Route>
                    <Route
                        path="/short"
                        element={<Short handleToggleSidebar={handleToggleSidebar} SlideBar={SlideBar}></Short>}
                    ></Route>

                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signup" element={<SingUp />}></Route>
                    <Route path="/signout" element={<Singout />}></Route>
                    <Route path="/reset" element={<ResetPassword />}></Route>

                    <Route path="/upload" element={<UploadVideo />}></Route>
                    <Route path="/homeapp" element={<HomeApp />}></Route>
                    <Route path="/videoapp/:id" element={<VideoApp />}></Route>

                    <Route path="/library/" element={<Library />}></Route>
                    <Route
                        path="/videoall/"
                        element={
                            <VideoAll
                                videov={video}
                                handleVideoClickv={handleVideoClick}
                                hadleYoutubev={hadleYoutube}
                            />
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
                            <DisLikeAll
                                videos={video}
                                handleVideoClicks={handleVideoClick}
                                hadleYoutubes={hadleYoutube}
                            />
                        }
                    ></Route>

                    <Route
                        path="/subscript/"
                        element={<Subscript videosb={video} dispatch={dispatch} firebaseId={firebaseId} />}
                    ></Route>
                    <Route path="/channelapp/:id" element={<ChannelApp />}></Route>
                    <Route path="/uploadusers/" element={<VideoUploadUsers />}></Route>
                    <Route
                        path="/channel-register/"
                        element={<ChannelInfor userInfo={userInfo} firebaseId={firebaseId} />}
                    ></Route>
                </Routes>
            </main>
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
