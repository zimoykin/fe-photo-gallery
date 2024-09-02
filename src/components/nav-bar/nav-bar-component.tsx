import React from 'react';
import './nav-bar-style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/auth-slice';

const NavBar: React.FC = () => {
    const dispatch = useDispatch();
    const handleOnClick = () => {
        dispatch(logout());
    };

    return (
        <div className='nav-bar'>
            <i className="fa fa-sign-out"
                onClick={handleOnClick}
            />
            <i className="fas fa-cog" />
        </div>
    );
};

export default NavBar;