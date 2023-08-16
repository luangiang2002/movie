import React from 'react';
import './ComponentError.scss';
import { Link } from 'react-router-dom';
const ComponetnError = () => {
    return (
        <div className="component">
            <div className="component_div">
                <h1>Xin chào</h1>
                <p>để thực hiện chức năng này bạn cần phải đăng nhập </p>
                <div>
                    <p>
                        <Link to={'/login'}>Đăng nhập | </Link>
                    </p>
                    <p>
                        <Link to={'/'}> Trở về</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ComponetnError;
