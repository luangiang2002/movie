import { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import './Interface.scss';
const Interface = ({ setShowDeviceInterface, setDarkMode }) => {
    const [interfaceSelected, setInterfaceSelected] = useState(null);

    const handleGoBack = () => {
        setShowDeviceInterface(false);
    };

    const toggleDark = () => {
        if (interfaceSelected !== 'dark') {
            setDarkMode(true);
            setInterfaceSelected('dark');
        }
    };

    const toggleMode = () => {
        if (interfaceSelected !== 'light') {
            setDarkMode(false);
            setInterfaceSelected('light');
        }
    };

    return (
        <>
            <div className="interface">
                <div>
                    <BsArrowLeft onClick={handleGoBack} className="interface_icon" />
                    <p>Giao diện</p>
                </div>
                <hr />
                <h6>Tùy chọn cài đặt chỉ áp dụng cho trình duyệt này</h6>
                <p onClick={toggleDark}>Giao diện tối</p>
                <p onClick={toggleMode}>Giao diện sáng</p>
            </div>
        </>
    );
};

export default Interface;
