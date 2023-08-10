import React, { useState } from 'react';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './Validation';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase/fibefire';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const Login = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        email: '',
        pass: '',
    });
    const [error, setError] = useState({});
    const [errorButton, setErrorButton] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        setError({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(Validation(value));
        setErrorButton('');

        if (Object.keys(error).length === 0 && value.email !== '' && value.pass !== '') {
            setIsSubmitting(true);

            try {
                const data = await signInWithEmailAndPassword(auth, value.email, value.pass);
                toast.success(`Đăng nhập thành công`, {
                    autoClose: 4000,
                    position: 'top-left',
                });

                setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 5000);

                const userInfo = {
                    email: value.email,
                    accessToken: data.user.accessToken,
                };
                const userRef = collection(db, 'users');

                // Kiểm tra xem người dùng đã tồn tại trong bảng "users" chưa
                const querySnapshot = await getDocs(query(userRef, where('email', '==', value.email)));
                if (querySnapshot.size > 0) {
                    // Người dùng đã tồn tại, không thêm mới
                    console.log('Người dùng đã tồn tại:', querySnapshot.docs[0].data());
                } else {
                    // Người dùng chưa tồn tại, thêm mới người dùng
                    const userInfo = {
                        email: value.email,
                        accessToken: data.user.accessToken,
                    };
                    await addDoc(userRef, userInfo);
                    console.log('Đã thêm mới người dùng:', userInfo);
                }
                localStorage.setItem('watch-user', JSON.stringify(userInfo));

                setIsSubmitting(false);
            } catch (error) {
                setIsSubmitting(false);
                if (error.code === 'auth/too-many-requests') {
                    setErrorButton('Sai quá nhiều lần vui lòng thử lại sau');
                } else if (error.code === 'auth/wrong-password') {
                    setErrorButton('Email hoặc mật khẩu không đúng');
                }
            }
        }
    };

    const [showPassword, setShowPassword] = useState(true);

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    return (
        <div className="login">
            <form className="login_form">
                <h1>Wecome back</h1>
                <p>Email</p>
                <input
                    type="text"
                    placeholder="Enter your email"
                    name="email"
                    onChange={handleChange}
                    value={value.email}
                />
                {error.email && <span>{error.email}</span>}
                <p>Password</p>
                <div className="login_form--icon">
                    <input
                        type={showPassword ? 'password' : 'text'}
                        placeholder="Enter your password"
                        name="pass"
                        id="toggle-password"
                        onChange={handleChange}
                        value={value.pass}
                    />
                    {showPassword ? (
                        <FaEyeSlash onClick={handleTogglePassword} />
                    ) : (
                        <FaEye onClick={handleTogglePassword} />
                    )}
                </div>
                {error.pass && <span>{error.pass}</span>} <br />
                <span>{Object.keys(error).length === 1 && errorButton}</span> <br />
                <Link to="/reset">Forget passsword</Link> <br />
                <button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
                <div className="login_gignup">
                    <p>
                        Don't have an account ? <Link to="/signup">Sign up</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};
export default Login;
