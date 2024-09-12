import React, { useState } from 'react';
import './login-style.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/auth-slice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { apilogin, apiMe } from '../../api/login-api';
import CameraSpinnerModal from '../../components/camera-spinner/camera-spinner-modal.component';
import { setUserProfile } from '../../features/profile/profile-slice';

export const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    const handleLogin = async () => {
        if (email?.length > 0 && password?.length > 0) {
            setLoading(true);
            apilogin(email, password)
                .then((tokens) => {
                    if (tokens.accessToken && tokens.refreshToken) {
                        dispatch(
                            login([tokens.accessToken, tokens.refreshToken])
                        );
                        // Get user profile
                        apiMe().then((user) => {
                            dispatch(setUserProfile(user));
                            navigate(`/gallery/${user.id}`);
                        });
                    } else {
                        setError(new Error('Invalid credentials'));
                    }
                })
                .catch((error) => {
                    setError(error);
                }).finally(() => {
                    setLoading(false);
                });
        } else {
            setError(new Error('Please enter both email and password'));
        }
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return (
        <>
            {error ? <div className='error-message' onClick={() => setError(null)}> <div>{error.message}</div></div> : null}
            <div className='pageContainer'>
                <div className='logoContainer'>
                    <div className='logo'>
                        <h1 className='logo-h1 '> make your gallery</h1>
                    </div>
                </div>
                {isAuthenticated ? <div className='user-data-container' style={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>
                    <h1>You are already logged in</h1>
                    <h3>click here to continue using app</h3>
                </div> : <>
                    {loading
                        ?
                        <CameraSpinnerModal />
                        :
                        <div className="user-data-container" >
                            <input className='input' value={email} type="email" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                            <input className='input' value={password} type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                            <button onClick={() => handleLogin()}>LOGIN</button>
                        </div>}
                </>}
            </div>

        </>
    );
};