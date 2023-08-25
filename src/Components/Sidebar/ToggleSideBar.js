import React from 'react';
import './toggleSidebar.scss';
import { AiOutlineCloudUpload, AiOutlineHome } from 'react-icons/ai';
import { HiOutlineViewBoards, HiOutlineFolderAdd, HiOutlineCollection } from 'react-icons/hi';
import { FaBars } from 'react-icons/fa';
import { TbHomePlus } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
const ToggleSideBar = ({ SlideBar, handleToggleSidebar, activeItem, handleItemClick }) => {
    const navigate = useNavigate();

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
        <div className={`smooth toggle ${SlideBar ? '' : 'close'}`} onClick={handleToggleSidebar}>
            <div
                className={`smooth toggle_toggleSidebar ${!SlideBar ? 'hidden' : ''}`}
                onClick={() => handleToggleSidebar(SlideBar)}
            >
                <div className="toggle_toggleSidebar--logo center-y">
                    <button className="center smooth" onClick={() => handleToggleSidebar(SlideBar)}>
                        <FaBars />
                    </button>
                    <div className="center-y">
                        <button>
                            <img src="https://i.ibb.co/s9Qys2j/logo.png" alt="logo" />
                        </button>
                    </div>
                </div>
                <div
                    className={`smooth sidebar__select-wrapper toggle_toggleSidebar--home ${
                        activeItem === '/' ? 'active' : ''
                    }`}
                    onClick={handleHome}
                    style={{ marginTop: '20px' }}
                >
                    <div onClick={() => handleToggleSidebar(SlideBar)}>
                        <div>
                            <AiOutlineHome />
                        </div>
                        <p>Trang chủ</p>
                    </div>
                </div>
                <div
                    className={`smooth sidebar__select-wrapper toggle_toggleSidebar--short ${
                        activeItem === 'short' ? 'active' : ''
                    }`}
                    onClick={handleSort}
                >
                    <div onClick={() => handleToggleSidebar(SlideBar)}>
                        <div>
                            <HiOutlineViewBoards />
                        </div>
                        <p>Short</p>
                    </div>
                </div>
                <div
                    className={`smooth sidebar__select-wrapper toggle_toggleSidebar--register ${
                        activeItem === 'subscript' ? 'active' : ''
                    }`}
                    onClick={handleSubcript}
                >
                    <div onClick={() => handleToggleSidebar(SlideBar)}>
                        <div>
                            <HiOutlineFolderAdd />
                        </div>
                        <p>Kênh đăng kí</p>
                    </div>
                </div>
                <div
                    className={`smooth sidebar__select-wrapper toggle_toggleSidebar--library ${
                        activeItem === 'library' ? 'active' : ''
                    }`}
                    onClick={handleLibrary}
                >
                    <div onClick={() => handleToggleSidebar(SlideBar)}>
                        <div>
                            <HiOutlineCollection />
                        </div>
                        <p>Thư viện</p>
                    </div>
                </div>
                <div
                    className={`smooth sidebar__select-wrapper toggle_toggleSidebar--library ${
                        activeItem === 'homeapp' ? 'active' : ''
                    }`}
                    onClick={handleVideoApp}
                >
                    <div onClick={() => handleToggleSidebar(SlideBar)}>
                        <div>
                            <TbHomePlus />
                        </div>
                        <p>Video App</p>
                    </div>
                </div>
                <div
                    className={`smooth sidebar__select-wrapper toggle_toggleSidebar--library ${
                        activeItem === 'uploadusers' ? 'active' : ''
                    }`}
                    onClick={handleUser}
                >
                    <div onClick={() => handleToggleSidebar(SlideBar)}>
                        <div>
                            <AiOutlineCloudUpload />
                        </div>
                        <p>Video upload</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToggleSideBar;
