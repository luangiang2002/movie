import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import Avatar from '../AvatarLogin/Avatar';
import { useSelector } from 'react-redux';
import { RiFolderUploadLine } from 'react-icons/ri';

const Header = ({ handleToggleSidebar, setDarkMode }) => {
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
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            navigate(`/search/${input}`);
        }
    };
    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search/${input}`);
    };

    const handleImgClick = useCallback(() => {
        if (isLoggedIn) {
            setShowAvatar((prev) => !prev);
        } else {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    const urlAvatar = useSelector((state) => state.imageAvatar);

    const handleUpload = () => {
        if (isLoggedIn) {
            navigate('/upload');
        } else {
            navigate('/modal');
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
        <div className=" header ">
            <div className="header_logo">
                <FaBars onClick={() => handleToggleSidebar()} />
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
                <button onClick={handleSearch}>
                    <AiOutlineSearch />
                </button>
            </div>
            <div className="header_icon">
                <RiFolderUploadLine onClick={handleUpload} />
                {urlAvatar?.urlAvatar ? (
                    <img src={urlAvatar?.urlAvatar} alt="avater" onClick={handleImgClick} />
                ) : (
                    <img
                        src="https://img.freepik.com/free-icon/user_318-159711.jpg?size=626&ext=jpg&ga=GA1.1.614860776.1689582553&semt=sph"
                        alt="default_avater"
                        onClick={handleImgClick}
                    />
                )}
            </div>
            {isLoggedIn && showAvatar && (
                <div ref={avatarRef} className="avatar">
                    <Avatar userInfo={userInfo} setDarkMode={setDarkMode} />
                </div>
            )}
        </div>
    );
};

export default Header;
