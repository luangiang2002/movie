import React from 'react'
import './toggleSidebar.scss'
import { AiFillHome } from 'react-icons/ai'
import { HiOutlineViewBoards, HiOutlineFolderAdd, HiOutlineCollection } from 'react-icons/hi'
import { FaBars } from 'react-icons/fa'
import { TbHomePlus } from 'react-icons/tb'
import { FiUsers,FiUser } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
const ToggleSideBar = ({ sidebar, handleToggleSidebar }) => {
    const navigate=useNavigate()
    const handleHome=()=>{
        navigate('/')
    }
    const handleSort=()=>{
        navigate('/sort')
    }
    const handleVideoApp=()=>{
        navigate('/homeapp')
    }
    return (
        <div className={sidebar?"toggle":'toggle close'} onClick={handleToggleSidebar}>
            <div className={sidebar ? 'toggle_toggleSidebar toggle_open' : 'toggle_toggleSidebar'}
                onClick={() => handleToggleSidebar(sidebar)}>
                <div className="toggle_toggleSidebar--logo" >
                    <FaBars onClick={() => handleToggleSidebar(sidebar)} />
                    <img src="https://i.ibb.co/s9Qys2j/logo.png" alt="" />
                </div>
                <div className="toggle_toggleSidebar--home" onClick={handleHome} >
                    <AiFillHome  onClick={() => handleToggleSidebar(sidebar)}  />
                    <p  onClick={() => handleToggleSidebar(sidebar)} >Trang chủ</p>
                </div>
                <div className="toggle_toggleSidebar--short" onClick={handleSort}>
                    <HiOutlineViewBoards  onClick={() => handleToggleSidebar(sidebar)}  />
                    <p  onClick={() => handleToggleSidebar(sidebar)}  >Short</p>
                </div>
                <div className="toggle_toggleSidebar--register">
                    <HiOutlineFolderAdd  onClick={() => handleToggleSidebar(sidebar)}  />
                    <p  onClick={() => handleToggleSidebar(sidebar)}  >Kênh đăng kí</p>
                </div>
                <div className="toggle_toggleSidebar--library">
                    <HiOutlineCollection  onClick={() => handleToggleSidebar(sidebar)}  />
                    <p  onClick={() => handleToggleSidebar(sidebar)}  >Thư viện</p>
                </div>
                <div className="toggle_toggleSidebar--library" onClick={handleVideoApp}>
                    <TbHomePlus  onClick={() => handleToggleSidebar(sidebar)}  />
                    <p  onClick={() => handleToggleSidebar(sidebar)}>Video App</p>
                </div>
                <div className="toggle_toggleSidebar--library">
                    <FiUsers  onClick={() => handleToggleSidebar(sidebar)}  />
                    <p  onClick={() => handleToggleSidebar(sidebar)}>Thành viên</p>
                </div>
                <div className="toggle_toggleSidebar--library">
                    <FiUser  onClick={() => handleToggleSidebar(sidebar)}  />
                    <p  onClick={() => handleToggleSidebar(sidebar)}>Hồ sơ</p>
                </div>
            </div>
        </div>
    )
}

export default ToggleSideBar