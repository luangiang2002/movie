
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import { getUserIdByEmail } from './componet/AvatarLogin/FirebaseData';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase/fibefire';
import { useDispatch } from 'react-redux';
import Header from './componet/header/Header';
import ToggleSideBar from './componet/sidebar/ToggleSideBar';
import UploadVideo from './componet/UploadVideo/UploadVideo';

function App() {
  const [sidebar, toggleSidebar] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

  const location = useLocation();
  const handleToggleSidebar = () => toggleSidebar(value => !value)
  const dispatch = useDispatch();
  const [avatarImage, setAvatarImage] = useState(null);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('watch-user'));
    if (userInfo && userInfo.email) {
      getUserIdByEmail(userInfo.email)
        .then((id) => {
          const docRef = doc(db, "users", id);
          const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
              const data = doc.data();
              const newAvatarImage = data.image;
              if (newAvatarImage !== avatarImage) {
                dispatch({ type: 'UPDATE_AVATAR', payload: newAvatarImage });
                setAvatarImage(newAvatarImage);
              }
            } else {
              const defaultAvatarImage = 'https://img.freepik.com/free-icon/user_318-159711.jpg?size=626&ext=jpg&ga=GA1.1.614860776.1689582553&semt=sph';
              if (defaultAvatarImage !== avatarImage) {
                dispatch({ type: 'UPDATE_AVATAR', payload: defaultAvatarImage });
                setAvatarImage(defaultAvatarImage);
              }
            }
          });
          return () => unsubscribe();
        })
        .catch((error) => {
          console.error('Đã xảy ra lỗi:', error);
        });
    }
  }, [ avatarImage, dispatch]);
 

  useEffect(() => {
    const hideHeaderOnLoginAndSignup = ['/login', '/signup','signout','/reset'].includes(location.pathname);
    setHideHeader(hideHeaderOnLoginAndSignup);
  }, [location]);
  const [isDarkMode, setDarkMode] = useState(false);
  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      {!hideHeader && (
        <Header handleToggleSidebar={handleToggleSidebar} setDarkMode={setDarkMode}  />
      )}
      <ToggleSideBar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
      <Routes>
        <Route path='/' element={<HomePage handleToggleSidebar={handleToggleSidebar} sidebar={sidebar}></HomePage>}></Route>
        <Route path='/homevideo/:id' element={<HomeVideo handleToggleSidebar={handleToggleSidebar} sidebar={sidebar} ></HomeVideo>}></Route>
        <Route path='/channel/:id' element={<Channel handleToggleSidebar={handleToggleSidebar} sidebar={sidebar}></Channel>}></Route>
        <Route path='/search/:id' element={<SearchVideo handleToggleSidebar={handleToggleSidebar} sidebar={sidebar}></SearchVideo>}></Route>
        <Route path='/sort' element={<Short handleToggleSidebar={handleToggleSidebar} sidebar={sidebar}></Short>}></Route>

        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SingUp />}></Route>
        <Route path='/signout' element={<Singout />}></Route>
        <Route path='/reset' element={<ResetPassword />}></Route>


        <Route path='/upload' element={<UploadVideo />}></Route>

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