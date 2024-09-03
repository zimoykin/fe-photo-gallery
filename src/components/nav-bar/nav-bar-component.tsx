import React from 'react';
import './nav-bar-style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/auth-slice';
import { useTheme } from '../../contexts/theme/theme-context';
import { toDark, toLight } from '../../features/thema/thema-slice';


const NavBar: React.FC = () => {
    const dispatch = useDispatch();
    const { theme, setTheme } = useTheme();

    const handleOnClick = () => {
        dispatch(logout());
    };

    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        dispatch(theme === 'light' ? toDark() : toLight());
    };

    return (
        <div >
            <div
                className='nav-bar'>
                <i className="fas fa-cog" />
                {theme === 'dark' ? <i className="fas fa-sun" onClick={handleThemeChange} /> : <i className="fas fa-moon" onClick={handleThemeChange} />}
                <i className="fa fa-sign-out"
                    onClick={handleOnClick}
                />
            </div>
        </div>
    );
};

export default NavBar;