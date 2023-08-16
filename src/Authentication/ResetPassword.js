import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase/fibefire';
import './ResetPass.scss';
import { BiArrowBack } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
function ResetPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const handleReset = async () => {
        await sendPasswordResetEmail(auth, email);
        navigate('/login');
    };
    return (
        <div className="resetPassword">
            <div className="resetPassword_div">
                <h2>Forgot Password</h2>
                <p></p>
                <input
                    className="resetPassword_div--resetEmailInput"
                    placeholder="Enter Your Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button className="resetPassword_div--resetBtn" type="button" onClick={handleReset}>
                    {' '}
                    Next
                </button>
                <Link className="resetPassword_div--back" to={'/login'}>
                    <button>
                        <BiArrowBack />
                    </button>
                    <p>Back to login</p>
                </Link>
            </div>
        </div>
    );
}

export default ResetPassword;
