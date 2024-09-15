import React, { useState } from 'react';
import './styles/login-v2-style.css';
import Palitra from '../../components/palitra/palitra-component';
import { apilogin } from '../../api/login-api';
import { toast } from 'react-toastify';
import CameraSpinnerModal from '../../components/camera-spinner/camera-spinner-modal.component';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/auth-slice';
import { useNavigate } from 'react-router-dom';


export const LoginV2Page: React.FC = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        if (email?.length > 0 && password?.length > 0) {
            setIsLoading(true);
            apilogin(email, password).then((tokens) => {
                if (tokens.accessToken && tokens.refreshToken) {
                    dispatch(login([tokens.accessToken, tokens.refreshToken]));
                    toast.success('Login successful');
                    navigate('/home');
                }
                else {
                    toast.error('Invalid credentials');
                }
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setIsLoading(false);
            });
        } else {
            toast.error('Please enter both email and password');
        }
    };

    return (
        <div className="page-container login-v2-img-container">
            <div className='global-background-layer'>
                <div className='login-v2-layer-container'>
                    <div className='login-v2-layer-column' />
                    <div className='login-v2-layer-column' />
                    <div className='login-v2-layer-column' />
                    <div className='login-v2-layer-column' />
                    <div className='login-v2-layer-column' />
                    <div className='login-v2-layer-column' />
                    <div className='login-v2-layer-column' />
                    <div className='login-v2-layer-column' />
                    <div className='login-v2-layer-column' />
                    <div className='login-v2-layer-column' />
                </div>
            </div>
            <div className='login-v2-sign-in-container-top'>
                <Palitra />
            </div>

            <div
                className='login-v2-sign-in-container global-background-layer shadow'
            >
                <div className='login-v2-sign-in-container-full shadow'>
                </div>
                <div className='login-v2-sign-in-container-left'>
                    <Palitra />
                </div>
                <div className='login-v2-sign-in-container-right global-secondary-background-layer shadow'>
                    <div className='login-v2-sign-in-container-welcome global-div-color'>
                        <h1 className='global-title'>Welcome!</h1>
                    </div>
                    <div className='login-v2-sign-in-container-input'>
                        <input placeholder='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='global-input ' />
                        <input placeholder='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='global-input ' />
                    </div>
                    <div className='login-v2-sign-in-container-forgot-password'>
                        <a href="/forgotten-password">
                            <span>Forgot password?</span>
                        </a>
                    </div>

                    <div className='login-v2-sign-in-container-login-btn'>
                        <button
                            onClick={handleLogin}
                            className='global-button w-80 shadow'> Sign in </button>
                    </div>

                    <div className='login-v2-sign-in-container-signin-w-google'>
                        <div className='login-v2-sign-in-container-sign-or'>
                            <span>or</span>
                        </div>

                        <div className='login-v2-sign-in-container-google scale-s'>
                            <div className='google-icon' />
                            <span>Sign in with Google</span>
                        </div>
                    </div>

                    <div className='login-v2-sign-in-container-create-account scale-m'>
                        <span>Don't have an account? <a href="/register">Create one</a></span>
                    </div>
                </div>
            </div>
            {isLoading && <CameraSpinnerModal />}
        </div>
    );
};