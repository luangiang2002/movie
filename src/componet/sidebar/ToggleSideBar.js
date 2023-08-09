import React from 'react'
import './toggleSidebar.scss'
import { AiFillHome,AiOutlineCloudUpload } from 'react-icons/ai'
import { HiOutlineViewBoards, HiOutlineFolderAdd, HiOutlineCollection } from 'react-icons/hi'
import { FaBars } from 'react-icons/fa'
import { TbHomePlus } from 'react-icons/tb'
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
    const handleLibrary=()=>{
        navigate('/library')
    }
    const handleSubcript=()=>{
        navigate('/subscript')
    }
    const handleUser=()=>{
        navigate('/uploadusers')
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
                <div className="toggle_toggleSidebar--register" onClick={handleSubcript}>
                    <HiOutlineFolderAdd  onClick={() => handleToggleSidebar(sidebar)}  />
                    <p  onClick={() => handleToggleSidebar(sidebar)}  >Kênh đăng kí</p>
                </div>
                <div className="toggle_toggleSidebar--library" onClick={handleLibrary}>
                    <HiOutlineCollection  onClick={() => handleToggleSidebar(sidebar)}  />
                    <p  onClick={() => handleToggleSidebar(sidebar)}  >Thư viện</p>
                </div>
                <div className="toggle_toggleSidebar--library" onClick={handleVideoApp}>
                    <TbHomePlus  onClick={() => handleToggleSidebar(sidebar)}  />
                    <p  onClick={() => handleToggleSidebar(sidebar)}>Video App</p>
                </div>
                <div className="toggle_toggleSidebar--library" onClick={handleUser} >
                    <AiOutlineCloudUpload  onClick={() => handleToggleSidebar(sidebar)}  />
                    <p  onClick={() => handleToggleSidebar(sidebar)}>Video upload</p>
                </div>
            </div>
        </div>
    )
}

export default ToggleSideBar