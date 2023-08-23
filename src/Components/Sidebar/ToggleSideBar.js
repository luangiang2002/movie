import React, { useState } from 'react';
import './toggleSidebar.scss';
import { AiFillHome, AiOutlineCloudUpload } from 'react-icons/ai';
import { HiOutlineViewBoards, HiOutlineFolderAdd, HiOutlineCollection } from 'react-icons/hi';
import { FaBars } from 'react-icons/fa';
import { TbHomePlus } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
const ToggleSideBar = ({ SlideBar, handleToggleSidebar }) => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState(null);
    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };
    const handleHome = () => {
        navigate('/');
        handleItemClick('/');
    };

    const handleSort = () => {
        navigate('/short');
        handleItemClick('short');
    };
    const handleVideoApp = () => {
        navigate('/homeapp');
        handleItemClick('homeapp');
    };
    const handleLibrary = () => {
        navigate('/library');
        handleItemClick('library');
    };
    const handleSubcript = () => {
        navigate('/subscript');
        handleItemClick('subscript');
    };
    const handleUser = () => {
        navigate('/uploadusers');
        handleItemClick('uploadusers');
    };
    return (
        <div className={SlideBar ? 'toggle' : 'toggle close'} onClick={handleToggleSidebar}>
            <div
                className={SlideBar ? 'toggle_toggleSidebar toggle_open' : 'toggle_toggleSidebar'}
                onClick={() => handleToggleSidebar(SlideBar)}
            >
                <div className="toggle_toggleSidebar--logo">
                    <div onClick={() => handleToggleSidebar(SlideBar)}>
                        <FaBars />
                        <img src="https://i.ibb.co/s9Qys2j/logo.png" alt="" onClick={handleHome} />
                    </div>
                </div>
                <div className="toggle_toggleSidebar--home" onClick={handleHome}>
                    <div onClick={() => handleToggleSidebar(SlideBar)} className={activeItem === '/' ? 'active' : ''}>
                        <AiFillHome />
                        <p>Trang chủ</p>
                    </div>
                </div>
                <div className="toggle_toggleSidebar--short" onClick={handleSort}>
                    <div
                        onClick={() => handleToggleSidebar(SlideBar)}
                        className={activeItem === 'short' ? 'active' : ''}
                    >
                        <HiOutlineViewBoards />
                        <p>Short</p>
                    </div>
                </div>
                <div className="toggle_toggleSidebar--register" onClick={handleSubcript}>
                    <div
                        onClick={() => handleToggleSidebar(SlideBar)}
                        className={activeItem === 'subscript' ? 'active' : ''}
                    >
                        <HiOutlineFolderAdd />
                        <p>Kênh đăng kí</p>
                    </div>
                </div>
                <div className="toggle_toggleSidebar--library" onClick={handleLibrary}>
                    <div
                        onClick={() => handleToggleSidebar(SlideBar)}
                        className={activeItem === 'library' ? 'active' : ''}
                    >
                        <HiOutlineCollection />
                        <p>Thư viện</p>
                    </div>
                </div>
                <div className="toggle_toggleSidebar--library" onClick={handleVideoApp}>
                    <div
                        onClick={() => handleToggleSidebar(SlideBar)}
                        className={activeItem === 'homeapp' ? 'active' : ''}
                    >
                        <TbHomePlus />
                        <p>Video App</p>
                    </div>
                </div>
                <div className="toggle_toggleSidebar--library" onClick={handleUser}>
                    <div
                        onClick={() => handleToggleSidebar(SlideBar)}
                        className={activeItem === 'uploadusers' ? 'active' : ''}
                    >
                        <AiOutlineCloudUpload />
                        <p>Video upload</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToggleSideBar;
