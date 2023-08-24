import React, { useState } from 'react';
import './SingUp.scss';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase/fibefire';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AlertDialog from '../Components/AlertDialog';
import ModalHome from '../Components/ModalHome';
import ModalBack from '../Components/ModalBack';

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const [errorButton, setErrorButton] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [nextLocation, setNextLocation] = useState('');
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
    const [isSuccessModal, setSuccessModal] = useState(false);
    const [isSuccessModalBack, setSuccessModalBack] = useState(false);

    const passValue = watch('pass', '');
    const emailValue = watch('email', '');
    const confirmpassValue = watch('confirmPass', '');
    const UserNameValue = watch('username', '');
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        if (data.pass !== data.confirmPass) {
            errors.confirmPass = {
                type: 'validate',
                message: 'Mật khẩu không trùng khớp',
            };
        } else {
            errors.confirmPass = null;
        }

        try {
            const userRef = collection(db, 'users');
            const response = await createUserWithEmailAndPassword(auth, data.email, data.pass, data.confirmPass);
            await sendEmailVerification(auth.currentUser);
            const userInfo = {
                email: data.email,
                accessToken: response.user.accessToken,
                userName: data.username,
                channelInfo: null,
            };
            await addDoc(userRef, userInfo);

            setSuccessModalOpen(true);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setErrorButton('Email đã được sử dụng');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
    };
    const navigate = useNavigate();
    const onFocusInput = () => {
        setErrorButton('');
    };

    const handleModal = (location) => {
        if (
            passValue.length !== 0 ||
            confirmpassValue.length !== 0 ||
            emailValue.length !== 0 ||
            UserNameValue.length !== 0
        ) {
            setNextLocation(location);
            setSuccessModal((pre) => !pre);
        } else if (location === 'home') {
            navigate('/');
        } else if (location === 'login') {
            navigate('/login');
        }
    };
    return (
        <div className="signup">
            <form className="signup_form" onSubmit={handleSubmit(onSubmit)}>
                <h1>Sign Up</h1>
                <p>UserName</p>
                <input
                    type="text"
                    placeholder="Enter your username"
                    name="username"
                    onFocus={onFocusInput}
                    {...register('username', {
                        required: 'Bạn chưa nhập username',
                    })}
                />
                {errors.username && <span>{errors.username.message}</span>}
                <p>Email</p>
                <input
                    type="text"
                    placeholder="Enter your email"
                    name="email"
                    onFocus={onFocusInput}
                    {...register('email', {
                        required: 'Bạn chưa nhập email',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Email sai định dạng',
                        },
                    })}
                />
                {errors.email && <span>{errors.email.message}</span>}
                <p>Password</p>
                <div className="signup_form--icon">
                    <input
                        type={showPassword ? 'password' : 'text'}
                        placeholder="Enter your password"
                        name="pass"
                        onFocus={onFocusInput}
                        {...register('pass', {
                            required: 'Bạn chưa nhập mật khẩu',
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
                                message:
                                    'Mật khẩu chứa từ 8 đến 30 ký tự, ít nhất một chữ hoa, một chữ thường, một số và 1 kí tự đặc biệt.',
                            },
                        })}
                    />
                    {showPassword ? (
                        <FaEyeSlash onClick={handleTogglePassword} />
                    ) : (
                        <FaEye onClick={handleTogglePassword} />
                    )}
                </div>
                {errors.pass && <span>{errors.pass.message}</span>}
                <p>Confirm Password</p>
                <div className="signup_form--icon">
                    <input
                        type={showConfirmPassword ? 'password' : 'text'}
                        placeholder="Enter your Confirm Password"
                        name="confirmPass"
                        onFocus={onFocusInput}
                        {...register('confirmPass', {
                            required: 'Bạn chưa nhập lại mật khẩu',
                            validate: (value) => value === passValue || 'Mật khẩu không trùng khớp',
                        })}
                    />
                    {showConfirmPassword ? (
                        <FaEyeSlash onClick={handleToggleConfirmPassword} />
                    ) : (
                        <FaEye onClick={handleToggleConfirmPassword} />
                    )}
                </div>
                {errors.confirmPass && <span>{errors.confirmPass.message}</span>}
                <span>{errorButton}</span>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
                </button>

                <div className="signup_form_gignup">
                    <div>
                        <p onClick={() => handleModal('login')} className="modalhome">
                            Bạn đã có tài khoản? Đăng nhập
                        </p>
                    </div>

                    <div>
                        <p onClick={() => handleModal('home')} className="modalhome">
                            Trở về trang chủ
                        </p>
                    </div>
                </div>
            </form>
            <div>
                <AlertDialog open={isSuccessModalOpen} onClose={() => setSuccessModalOpen(false)} />
                <ModalHome location={nextLocation} open={isSuccessModal} onClose={() => setSuccessModal(false)} />
                <ModalBack open={isSuccessModalBack} onClose={() => setSuccessModalBack(false)} redirectPath="/login" />
            </div>
        </div>
    );
};

export default SignUp;
