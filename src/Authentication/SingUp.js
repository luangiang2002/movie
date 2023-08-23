import React, { useState } from 'react';
import './SingUp.scss';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase/fibefire';
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

    const passValue = watch('pass', '');
    const emailValue = watch('email', '');
    const confirmpassValue = watch('confirmPass', '');
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
            await createUserWithEmailAndPassword(auth, data.email, data.pass, data.confirmPass);
            await sendEmailVerification(auth.currentUser);

            setIsSubmitting(false);
            setSuccessModalOpen(true);
        } catch (error) {
            setIsSubmitting(false);
            if (error.code === 'auth/email-already-in-use') {
                setErrorButton('Email đã được sử dụng');
            }
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
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
    const [isSuccessModal, setSuccessModal] = useState(false);
    const [isSuccessModalBack, setSuccessModalBack] = useState(false);
    const handleModal = () => {
        if (passValue.length !== 0 || confirmpassValue.length !== 0 || emailValue.length !== 0) {
            setSuccessModal((pre) => !pre);
        } else {
            navigate('/login');
        }
    };
    const handleModalLogin = () => {
        if (passValue.length !== 0 || confirmpassValue.length !== 0 || emailValue.length !== 0) {
            setSuccessModalBack((pre) => !pre);
        } else {
            navigate('/login');
        }
    };
    return (
        <div className="signup">
            <form className="signup_form" onSubmit={handleSubmit(onSubmit)}>
                <h1>Sign Up</h1>
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
                        <p onClick={handleModalLogin} className="modalhome">
                            Bạn đã có tài khoản? Đăng nhập
                        </p>
                    </div>

                    <div>
                        <p onClick={handleModal} className="modalhome">
                            Trở về trang chủ
                        </p>
                    </div>
                </div>
            </form>
            <div>
                <AlertDialog open={isSuccessModalOpen} onClose={() => setSuccessModalOpen(false)} />
                <ModalHome open={isSuccessModal} onClose={() => setSuccessModal(false)} />
                <ModalBack open={isSuccessModalBack} onClose={() => setSuccessModalBack(false)} redirectPath="/login" />
            </div>
        </div>
    );
};

export default SignUp;
