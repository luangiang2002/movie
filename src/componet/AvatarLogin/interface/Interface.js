import React  from 'react'
import './interface.scss'
import { BsArrowLeft } from 'react-icons/bs'

const Interface = ({setShowDeviceInterface, setDarkMode}) => {
    const handleGoBack=()=> {
        setShowDeviceInterface(false);
    }
    const toggleDark = () => {
        setDarkMode(true);
    };
    const toggleMode = () => {
        setDarkMode(false);
    };
  return (
    <>
    <div className='interface'>
        <div>
            <BsArrowLeft onClick={handleGoBack} className='interface_icon'/>
            <p>Giao diện</p>
        </div>
        <hr />
        <h6>Tùy chọn cài đặt chỉ áp dụng cho trình duyệt này </h6>
        <p onClick={toggleDark}>Giao diện tối</p>
        <p onClick={toggleMode}>Giao diện sáng</p>
    </div>
</>
  )
}

export default Interface