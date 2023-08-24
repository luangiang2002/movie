import React, { useEffect, useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import Avatar from '../AvatarLogin/Avatar';
import { useSelector } from 'react-redux';
import { RiFolderUploadLine } from 'react-icons/ri';
import ModalUpload from '../ModalUpload';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Header = ({ handleToggleSidebar, setDarkMode, handleItemClick }) => {
    const defaultAvatar =
        'https://img.freepik.com/free-icon/user_318-159711.jpg?size=626&ext=jpg&ga=GA1.1.614860776.1689582553&semt=sph';
    const navigate = useNavigate();
    const [input, setInput] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAvatar, setShowAvatar] = useState(false);

    const userInfo = JSON.parse(localStorage.getItem('watch-user'));
    useEffect(() => {
        if (userInfo) {
            setIsLoggedIn(true);
        }
    }, [userInfo]);

    const handleHome = () => {
        navigate('/');
        handleItemClick('/');
    };
    const handleKeyDown = (event) => {
        if (input && input.trim() !== '') {
            if (event.key === 'Enter') {
                navigate(`/search/${input}`);
            }
        } else {
            return;
        }
    };
    const handleSearch = (e) => {
        e.preventDefault();
        if (input && input.trim() !== '') {
            navigate(`/search/${input}`);
        } else {
            return;
        }
    };

    const urlAvatar = useSelector((state) => state.imageAvatar);
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

    const handleUpload = () => {
        if (isLoggedIn && userInfo?.channelInfo === null) {
            navigate('/channel-register');
        } else if (isLoggedIn) {
            navigate('/upload');
        } else {
            setSuccessModalOpen((pre) => !pre);
        }
    };

    const avatarRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (avatarRef.current && !avatarRef.current.contains(event.target)) {
                setShowAvatar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className=" header">
            <div className="header_logo center">
                <button className="menu__button center" onClick={() => handleToggleSidebar()}>
                    <FaBars />
                </button>
                <img src="https://i.ibb.co/s9Qys2j/logo.png" alt="" onClick={handleHome} />
            </div>
            <div className="header_search">
                <input
                    type="text"
                    placeholder="Tìm kiếm"
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="input"
                />
                <Tippy content="Tìm kiếm">
                    <button onClick={handleSearch}>
                        <AiOutlineSearch />
                    </button>
                </Tippy>
            </div>
            <div className="header_icon center">
                <Tippy content="Tải video lên">
                    <button className="upload__btn center" onClick={handleUpload}>
                        <RiFolderUploadLine />
                    </button>
                </Tippy>
                {isLoggedIn ? (
                    <img
                        src={urlAvatar?.urlAvatar ? urlAvatar?.urlAvatar : defaultAvatar}
                        alt="avatar"
                        onClick={() => setShowAvatar((prev) => !prev)}
                    />
                ) : (
                    <button className="header__btn-login" onClick={() => navigate('/login')}>
                        Đăng nhập
                    </button>
                )}
            </div>
            {isLoggedIn && showAvatar && (
                <div ref={avatarRef} className="avatar">
                    <Avatar userInfo={userInfo} />
                </div>
            )}

            <ModalUpload open={isSuccessModalOpen} onClose={() => setSuccessModalOpen(false)} />
        </div>
    );
};

export default Header;
