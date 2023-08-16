import React from 'react';
import './toggleSidebar.scss';
import { AiFillHome, AiOutlineCloudUpload } from 'react-icons/ai';
import { HiOutlineViewBoards, HiOutlineFolderAdd, HiOutlineCollection } from 'react-icons/hi';
import { FaBars } from 'react-icons/fa';
import { TbHomePlus } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
const ToggleSideBar = ({ SlideBar, handleToggleSidebar }) => {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/');
    };
    const handleSort = () => {
        navigate('/sort');
    };
    const handleVideoApp = () => {
        navigate('/homeapp');
    };
    const handleLibrary = () => {
        navigate('/library');
    };
    const handleSubcript = () => {
        navigate('/subscript');
    };
    const handleUser = () => {
        navigate('/uploadusers');
    };
    return (
        <div className={SlideBar ? 'toggle' : 'toggle close'} onClick={handleToggleSidebar}>
            <div
                className={SlideBar ? 'toggle_toggleSidebar toggle_open' : 'toggle_toggleSidebar'}
                onClick={() => handleToggleSidebar(SlideBar)}
            >
                <div className="toggle_toggleSidebar--logo">
                    <FaBars onClick={() => handleToggleSidebar(SlideBar)} />
                    <img src="https://i.ibb.co/s9Qys2j/logo.png" alt="" />
                </div>
                <div className="toggle_toggleSidebar--home" onClick={handleHome}>
                    <AiFillHome onClick={() => handleToggleSidebar(SlideBar)} />
                    <p onClick={() => handleToggleSidebar(SlideBar)}>Trang chủ</p>
                </div>
                <div className="toggle_toggleSidebar--short" onClick={handleSort}>
                    <HiOutlineViewBoards onClick={() => handleToggleSidebar(SlideBar)} />
                    <p onClick={() => handleToggleSidebar(SlideBar)}>Short</p>
                </div>
                <div className="toggle_toggleSidebar--register" onClick={handleSubcript}>
                    <HiOutlineFolderAdd onClick={() => handleToggleSidebar(SlideBar)} />
                    <p onClick={() => handleToggleSidebar(SlideBar)}>Kênh đăng kí</p>
                </div>
                <div className="toggle_toggleSidebar--library" onClick={handleLibrary}>
                    <HiOutlineCollection onClick={() => handleToggleSidebar(SlideBar)} />
                    <p onClick={() => handleToggleSidebar(SlideBar)}>Thư viện</p>
                </div>
                <div className="toggle_toggleSidebar--library" onClick={handleVideoApp}>
                    <TbHomePlus onClick={() => handleToggleSidebar(SlideBar)} />
                    <p onClick={() => handleToggleSidebar(SlideBar)}>Video App</p>
                </div>
                <div className="toggle_toggleSidebar--library" onClick={handleUser}>
                    <AiOutlineCloudUpload onClick={() => handleToggleSidebar(SlideBar)} />
                    <p onClick={() => handleToggleSidebar(SlideBar)}>Video upload</p>
                </div>
            </div>
        </div>
    );
};

export default ToggleSideBar;
