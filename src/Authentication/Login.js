import React, { useState } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase/fibefire';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ModalHome from '../Components/ModalHome';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Login = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        watch,
    } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const [errorButton, setErrorButton] = useState('');
    const passValue = watch('pass', '');
    const emailValue = watch('email', '');
    const [nextLocation, setNextLocation] = useState('');

    const onSubmit = async (data) => {
        setError('password', {
            type: 'manual',
            message: '',
        });
        setIsSubmitting(true);

        try {
            const userData = await signInWithEmailAndPassword(auth, data.email, data.password);

            if (!userData.user.emailVerified) {
                setErrorButton('Vui lòng xác minh email trước khi đăng nhập');
                setIsSubmitting(false);
                return;
            }
            setErrorButton('');
            toast.success(`Đăng nhập thành công`, {
                autoClose: 4000,
                position: 'top-right',
            });
            const userRef = collection(db, 'users');
            const q = query(userRef, where('email', '==', emailValue));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const responInfo = querySnapshot.docs[0].data();
                const userInfo = {
                    email: responInfo.email,
                    accessToken: userData.user.accessToken,
                    userName: responInfo.userName,
                    channelInfo: null,
                };
                localStorage.setItem('watch-user', JSON.stringify(userInfo));
            }
            setTimeout(() => {
                navigate('/');
                window.location.reload();
            }, 4000);

            setIsSubmitting(false);
        } catch (error) {
            setIsSubmitting(false);
            setErrorButton('Email hoặc mật khẩu không đúng');
        }
    };

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const onFocusInput = () => {
        setErrorButton('');
    };

    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
    const handleModal = (location) => {
        if (passValue.length !== 0 || emailValue.length !== 0) {
            setSuccessModalOpen((pre) => !pre);
            setNextLocation(location);
        } else if (location === 'home') {
            navigate('/');
        } else if (location === 'signup') {
            navigate('/signup');
        }
    };
    return (
        <div className="wrapper">
            <div className="login__container center">
                <form className="login_form center" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="main__title">Đăng nhập</h1>
                    <div className="email__wrapper w-full">
                        <input
                            className="w-full smooth"
                            type="text"
                            placeholder="Email"
                            onFocus={onFocusInput}
                            name="email"
                            {...register('email', {
                                required: 'Bạn chưa nhập email',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Email sai định dạng',
                                },
                            })}
                        />
                        {errors.email && <span className="error-message">{errors.email.message}</span>}
                    </div>
                    <div className="password__wrapper w-full">
                        <div>
                            <input
                                className="w-full smooth"
                                type={showPassword ? 'password' : 'text'}
                                placeholder="Password"
                                name="password"
                                id="toggle-password"
                                onFocus={onFocusInput}
                                {...register('password', {
                                    required: 'Bạn chưa nhập mật khẩu',
                                })}
                            />
                            {showPassword ? (
                                <button className="center" type="button" onClick={handleTogglePassword}>
                                    <FaEyeSlash />
                                </button>
                            ) : (
                                <button className="center" type="button" onClick={handleTogglePassword}>
                                    <FaEye />
                                </button>
                            )}
                        </div>
                        {errors.password && <span className="error-message">{errors.password.message}</span>} <br />
                    </div>
                    <div className="submit__error-message w-full">
                        <span className="error-message">{errorButton}</span>
                    </div>
                    <Link className="forgotPassword___btn" to="/reset">
                        Quên mật khẩu
                    </Link>
                    <button className="login___btn" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                    <div className="backHome__wrapper">
                        <button type="button" className="mobile__signup-btn" onClick={() => handleModal('signup')}>
                            Đăng ký
                        </button>
                        <button type="button" className="modalhome" onClick={() => handleModal('home')}>
                            Trở về trang chủ
                        </button>
                    </div>
                </form>
                <div className="thumbnail center">
                    <div className="">
                        <h2 className="main__title">Welcome back</h2>
                    </div>
                    <div className="">
                        <p>Bạn chưa có tài khoản trước đó?</p>
                    </div>
                    <div className="signUp__wrapper">
                        <button className="signUp__btn" onClick={() => handleModal('signup')}>
                            Đăng ký
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <ModalHome
                    location={nextLocation}
                    open={isSuccessModalOpen}
                    onClose={() => setSuccessModalOpen(false)}
                />
            </div>
        </div>
    );
};

export default Login;
