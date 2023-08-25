import React from 'react';
import './NotFoundVideo.scss';
import NotFoundImg from '../../assets/images/no-item.png';

function NotFoundVideo() {
    return (
        <div className="notFound__wrapper center">
            <div className="notFound__container">
                <img className="notFound__img" src={NotFoundImg} alt="not-found" />
                <div className="notFound__noti-wrapper">
                    <span>Không tìm thấy video nào</span>
                </div>
            </div>
        </div>
    );
}

export default NotFoundVideo;
