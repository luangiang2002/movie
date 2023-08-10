import React, { useState } from 'react';
import './singup.scss';
import { Link, useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import Validation from './Validation';
import { toast } from 'react-toastify';
import { auth } from '../firebase/fibefire';
const SingUp = () => {
    const [value, setValue] = useState({
        email: '',
        pass: '',
        confirmPass: '',
    });
    const [error, setError] = useState({});
    const [errorButton, setErrorButton] = useState();
    const handleChane = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        setError(Object.keys(error));
    };
    const navigate = useNavigate();
    const hamdleSubmit = (e) => {
        e.preventDefault();
        setError(Validation(value));
        setErrorButton('');
        if (Object.keys(error).length === 0 && value.email !== '' && value.pass !== '' && value.confirmPass !== '') {
            createUserWithEmailAndPassword(auth, value.email, value.pass, value.confirmPass)
                .then((data) => {
                    toast.success(`Đăng kí thành công,Đang trở về trang đang nhập`, {
                        autoClose: 4000,
                        position: 'top-left',
                    });
                    setTimeout(() => {
                        navigate('/login');
                    }, 5000);
                })
                .catch((er) => {
                    if (er.code === 'auth/email-already-in-use') {
                        setErrorButton('Email đã tồn tại');
                    }
                });
        }
    };
    return (
        <div className="signup">
            <form className="signup_form">
                <h1>Wecome back</h1>
                <p>Email</p>
                <input
                    type="text"
                    placeholder="Enter your email"
                    name="email"
                    onChange={handleChane}
                    value={value.email}
                />
                {error.email && <span>{error.email}</span>}
                <p>Password</p>
                <input
                    type="password"
                    placeholder="Enter your password"
                    name="pass"
                    onChange={handleChane}
                    value={value.pass}
                />
                {error.pass && <span>{error.pass}</span>}
                <p>ConfirmPassword</p>
                <input
                    type="password"
                    placeholder="Enter your ConfirmPassword"
                    name="confirmPass"
                    onChange={handleChane}
                    value={value.confirmPass}
                />
                {error.confirmPass && <span>{error.confirmPass}</span>}
                <span>{Object.keys(error).length === 0 && errorButton}</span>
                <button type="submit" onClick={hamdleSubmit}>
                    Sign up
                </button>
                <div className="signup_form_gignup">
                    <p>
                        Already have an account ? <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};
export default SingUp;
