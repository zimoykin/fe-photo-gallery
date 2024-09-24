import React, { useState } from 'react';
import './styles/login-v2-style.css';
import Palitra from '../../components/palitra/palitra-component';
import { apilogin } from '../../api/login-api';
import { toast } from 'react-toastify';
import CameraSpinnerModal from '../../components/camera-spinner/camera-spinner-modal.component';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/auth-slice';
import { useNavigate } from 'react-router-dom';
import BackgroundWithImage from '../../components/background/background-component';
import { storeProfile } from '../../features/profile/profile-slice';
import { storeFolders } from '../../features/folders/folders-slice';
import { ApiClient } from '../../api/networking/api-client';
import { IProfile } from '../../interfaces/profile.interface';
import { IUserFolder } from '../../interfaces/folder.interface';


export const LoginV2Page: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignInWithGoogleClick = () => {
        toast.info('Unfortunately, this feature is not implemented yet 😵‍💫');
    };

    const handleLogin = () => {
        if (email?.length > 0 && password?.length > 0) {
            setIsLoading(true);
            apilogin(email, password).then(async (tokens) => {
                if (tokens.accessToken && tokens.refreshToken) {
                    dispatch(login([tokens.accessToken, tokens.refreshToken]));

                    await ApiClient.post<IProfile>('/profiles/login')
                        .catch((error) => {
                            toast.error(error);
                        });

                    await ApiClient.get<IProfile>('/profiles/me')
                        .then((user) => {
                            dispatch(storeProfile(user));
                        });

                    ApiClient.get<IUserFolder[]>(`/folders`).then((folders) => {
                        dispatch(storeFolders(folders));
                    }).catch((error) => {
                        toast.error(error);
                    });

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
        <div className="page-container">
            <BackgroundWithImage />
            <div className='login-v2-sign-in-container-top'>
                <div className='w-80 flex-center'>
                    <Palitra />
                </div>
            </div>

            <div
                className='login-v2-sign-in-container shadow'
            >
                <div className='login-v2-sign-in-container-full  global-background-layer shadow'>
                </div>
                <div className='login-v2-sign-in-container-left'>
                    <Palitra />
                </div>
                <div className='login-v2-sign-in-container-right scroll global-secondary-background-layer shadow'>
                    <div className='login-v2-sign-in-container-welcome global-div-color'>
                        <h1 className='global-title'>Welcome!</h1>
                    </div>
                    <div className='login-v2-sign-in-container-input'>
                        <input placeholder='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='global-input ' />
                        <input placeholder='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='global-input ' />
                    </div>
                    <div className='login-v2-sign-in-container-forgot-password'>
                        <a href="/recovery">
                            <span>Forgot password?</span>
                        </a>
                    </div>

                    <div className='login-v2-sign-in-container-login-btn'>
                        <button
                            onClick={handleLogin}
                            className='global-button w-80 shadow'> Sign in </button>
                    </div>

                    <div className='login-v2-sign-in-container-signin-w-google global-div-color'>
                        <div className='login-v2-sign-in-container-sign-or'>
                            <span>or</span>
                        </div>

                        <div className='login-v2-sign-in-container-google scale-s'
                            onClick={handleSignInWithGoogleClick}>
                            <div className='google-icon' />
                            <span>Sign in with Google</span>
                        </div>
                    </div>

                    <div className='login-v2-sign-in-container-create-account scale-m'>
                        <span>Do not have an account? <a href="/register">Create one</a></span>
                    </div>
                </div>
            </div>
            {isLoading && <CameraSpinnerModal />}
        </div>
    );
};