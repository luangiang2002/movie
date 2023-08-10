import React from 'react';
import './SideBar.scss';
import { AiFillHome } from 'react-icons/ai';
import { HiOutlineViewBoards, HiOutlineFolderAdd, HiOutlineCollection } from 'react-icons/hi';
const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar_home">
                <AiFillHome />
                <p>Trang chủ</p>
            </div>
            <div className="sidebar_short">
                <HiOutlineViewBoards />
                <p>Short</p>
            </div>
            <div className="sidebar_register">
                <HiOutlineFolderAdd />
                <p>Kênh đăng kí</p>
            </div>
            <div className="sidebar_">
                <HiOutlineCollection />
                <p>Thư viện</p>
            </div>
        </div>
    );
};

export default SideBar;
