import React, { useState } from 'react';
import './SingUp.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../firebase/fibefire';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm();

    const navigate = useNavigate();

    const [errorButton, setErrorButton] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            await createUserWithEmailAndPassword(auth, data.email, data.pass, data.confirmPass);
            await sendEmailVerification(auth.currentUser);

            toast.success(
                `Đăng kí thành công, vui lòng kiểm tra email của bạn để xác minh tài khoản. Đang trở về trang đăng nhập`,
                {
                    autoClose: 5000,
                    position: 'top-right',
                },
            );

            setIsSubmitting(false);
            setTimeout(() => {
                navigate('/login');
            }, 5000);
        } catch (error) {
            setIsSubmitting(false);
            if (error.code === 'auth/email-already-in-use') {
                setErrorButton('Email đã được sử dụng');
            }
        }
    };
    const [showPassword, setShowPassword] = useState(true);

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const onFocusInput = () => {
        setErrorButton('');
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
                                    'Mật khẩu chứa từ 8 đến 30 ký tự, ít nhất một chữ hoa, một chữ thường và một số.',
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
                        type={showPassword ? 'password' : 'text'}
                        placeholder="Enter your Confirm Password"
                        name="confirmPass"
                        onFocus={onFocusInput}
                        {...register('confirmPass', {
                            required: 'Bạn chưa nhập lại mật khẩu',
                            validate: (value) => value === getValues('pass') || 'Mật khẩu không trùng nhau',
                        })}
                    />
                    {showPassword ? (
                        <FaEyeSlash onClick={handleTogglePassword} />
                    ) : (
                        <FaEye onClick={handleTogglePassword} />
                    )}
                </div>
                {errors.confirmPass && <span>{errors.confirmPass.message}</span>}
                <span>{errorButton}</span>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing up...' : 'Sign Up'}
                </button>

                <div className="signup_form_gignup">
                    <p>
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                    <p>
                        <Link to="/">Trở về trang chủ</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
