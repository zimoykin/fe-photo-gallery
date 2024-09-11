import React, { useEffect, useState } from 'react';
import './nav-bar-style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/auth-slice';
import { useTheme } from '../../contexts/theme/theme-context';
import { toDark, toLight } from '../../features/thema/thema-slice';
import { useLocation, useNavigate } from 'react-router-dom';


const NavBar: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [iconSet, setIconSet] = useState<'home' | 'settings'>('home');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname);
        if (location.pathname === '/') {
            setIconSet('settings');
        } else {
            setIconSet('home');
        }
    }, [location, theme, setTheme]);

    const handleOnClick = () => {
        dispatch(logout());
    };

    const handleSettings = () => {
        console.log(location.pathname);
        if (location.pathname === '/settings') {
            navigate('/');
        } else
            navigate('/settings');
    };

    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        dispatch(theme === 'light' ? toDark() : toLight());
    };

    return (
        <div
            className='nav-bar'>
            <div className='nav-bar-command-panel'>
                <i className="fa-solid fa-bell" />
                {iconSet === 'home' ? <i className="fas fa-home" onClick={handleSettings} /> : < i className="fas fa-cog" onClick={handleSettings} />}
                {theme === 'dark' ? <i className="fas fa-sun" onClick={handleThemeChange} /> : <i className="fas fa-moon" onClick={handleThemeChange} />}
                <i className="fa fa-sign-out"
                    onClick={handleOnClick}
                />
            </div>
        </div>

    );
};

export default NavBar;