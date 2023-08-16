import React, { useState } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase/fibefire';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const [errorButton, setErrorButton] = useState('');

    const onSubmit = async (data) => {
        setError('pass', {
            type: 'manual',
            message: '',
        });
        setIsSubmitting(true);

        try {
            const userData = await signInWithEmailAndPassword(auth, data.email, data.pass);

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

            setTimeout(() => {
                navigate('/');
                window.location.reload();
            }, 4000);

            const userInfo = {
                email: data.email,
                accessToken: userData.user.accessToken,
            };

            setIsSubmitting(false);
            localStorage.setItem('watch-user', JSON.stringify(userInfo));
            const userRef = collection(db, 'users');
            const querySnapshot = await getDocs(query(userRef, where('email', '==', data.email)));
            if (querySnapshot.size > 0) {
                return null;
            } else {
                await addDoc(userRef, userInfo);
            }
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

    return (
        <div className="login">
            <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
                <h1>Welcome back</h1>
                <p>Email</p>
                <input
                    type="text"
                    placeholder="Enter your email"
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
                {errors.email && <span>{errors.email.message}</span>}
                <p>Password</p>
                <div className="login_form--icon">
                    <input
                        type={showPassword ? 'password' : 'text'}
                        placeholder="Enter your password"
                        name="pass"
                        id="toggle-password"
                        onFocus={onFocusInput}
                        {...register('pass', {
                            required: 'Bạn chưa nhập mật khẩu',
                        })}
                    />
                    {showPassword ? (
                        <FaEyeSlash onClick={handleTogglePassword} />
                    ) : (
                        <FaEye onClick={handleTogglePassword} />
                    )}
                </div>
                {errors.pass && <span>{errors.pass.message}</span>} <br />
                <span>{errorButton}</span>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
                <Link to="/reset">Forget password</Link> <br />
                <div className="login_gignup">
                    <p>
                        Don't have an account ? <Link to="/signup">Sign up</Link>
                    </p>
                    <p>
                        <Link to="/">Trở về trang chủ</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
