import React, { useEffect } from 'react';
import './home-style.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { apiMe } from '../../api/login-api';
import { setUserProfile } from '../../features/profile/profile-slice';

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const profile = useSelector((state: RootState) => state.profile);
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth.isAuthenticated && !profile.user?.id) {
            apiMe().then((user) => {
                dispatch(setUserProfile(user));
            });
        }
    }, [profile, navigate, auth.isAuthenticated, dispatch]);

    return (
        <div className="home-page-container">
            <div className="home-box-container">
                {profile.user?.id && <div
                    className='home-page-navigate-to-gallery'
                    onClick={() => navigate('/gallery?userId=' + profile.user?.id)}>
                    {'Your gallery is here.'}
                </div>}
            </div>
        </div>
    );
};