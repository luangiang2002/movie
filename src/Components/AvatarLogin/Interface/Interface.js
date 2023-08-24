import { BsArrowLeft, BsCheckLg } from 'react-icons/bs';
import './Interface.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../../redux/action/themeAction';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
import { db } from '../../../firebase/fibefire';

const Interface = ({ setShowDeviceInterface }) => {
    const { mode } = useSelector((state) => state.theme);
    const { firebaseId } = useSelector((state) => state.imageAvatar);
    const dispatch = useDispatch();

    const handleGoBack = () => {
        setShowDeviceInterface(false);
    };

    const handleMode = async (mode) => {
        dispatch(changeTheme(mode));
        const userDocRef = doc(db, 'users', firebaseId);

        await updateDoc(userDocRef, { interfaceMode: mode });
    };

    return (
        <>
            <div className="interface">
                <div className="interface__title-wrapper">
                    <button className="center smooth" onClick={handleGoBack}>
                        <BsArrowLeft className="interface_icon" />
                    </button>
                    <p>Giao diện</p>
                </div>
                <hr />
                <div className="interface__content-wrapper">
                    <h6>Tùy chọn cài đặt chỉ áp dụng cho trình duyệt này</h6>
                    <div>
                        <button className="interface__interactive-wrapper smooth">
                            <div className="center-x">{mode === 'light' && <BsCheckLg />}</div>
                            <span onClick={() => handleMode('light')}>Giao diện sáng</span>
                        </button>
                        <button className="interface__interactive-wrapper smooth">
                            <div className="center-x">{mode !== 'light' && <BsCheckLg />}</div>
                            <span onClick={() => handleMode('dark')}>Giao diện tối</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Interface;
