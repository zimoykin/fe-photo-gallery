import React, { useEffect, useState } from 'react';
import './nav-bar-style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/auth-slice';
import { useTheme } from '../../contexts/theme/theme-context';
import { toDark, toLight } from '../../features/thema/thema-slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../store';


const NavBar: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [iconSet, setIconSet] = useState<'home' | 'settings' | 'gallery'>('home');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userProfile = useSelector((state: RootState) => state.profile);

    useEffect(() => {
        if (location.pathname.startsWith('/settings')) {
            setIconSet('settings');
        } else if (location.pathname.startsWith('/gallery')) {
            setIconSet('gallery');
        } else {
            setIconSet('home');
        }
    }, [location, theme, setTheme]);

    const handleOnClick = () => {
        dispatch(logout());
    };

    const handleIconClick = (page: 'home' | 'gallery' | 'settings') => {
        switch (page) {
            case 'home':
                navigate(`/home`);
                break;
            case 'gallery':
                navigate(`/gallery/${userProfile.user!.id}`);
                break;
            case 'settings':
                navigate(`/settings`);
                break;
            default:
                break;
        }
    };

    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        dispatch(theme === 'light' ? toDark() : toLight());
    };

    return (
        <div
            className='nav-bar'>
            <div className='nav-bar-command-panel'>
                {iconSet === 'home' &&
                    <div className='nav-bar-command-panel'>
                        <i className="nav-bar-icon fa-solid fa-bell" />
                        <i className="nav-bar-icon fas fa-image" onClick={() => handleIconClick('gallery')} />
                        <i className="nav-bar-icon fas fa-cog" onClick={() => handleIconClick('settings')} />
                        {theme === 'dark' ? <i className="nav-bar-icon fas fa-sun" onClick={handleThemeChange} /> : <i className="nav-bar-icon fas fa-moon" onClick={handleThemeChange} />}
                        <i className="nav-bar-icon fa fa-sign-out"
                            onClick={handleOnClick}
                        />
                    </div>
                }

                {iconSet === 'gallery' &&
                    <div className='nav-bar-command-panel'>
                        <i className="nav-bar-icon fa-solid fa-bell" />
                        <i className="nav-bar-icon fas fa-home" onClick={() => handleIconClick('home')} />
                        <i className="nav-bar-icon fas fa-cog" onClick={() => handleIconClick('settings')} />
                        {theme === 'dark' ? <i className="nav-bar-icon fas fa-sun" onClick={handleThemeChange} /> : <i className="nav-bar-icon fas fa-moon" onClick={handleThemeChange} />}
                        <i className="nav-bar-icon fa fa-sign-out"
                            onClick={handleOnClick}
                        />
                    </div>
                }

                {iconSet === 'settings' &&
                    <div className='nav-bar-command-panel'>
                        <i className="nav-bar-icon fa-solid fa-bell" />
                        <i className="nav-bar-icon fas fa-home" onClick={() => handleIconClick('home')} />
                        <i className="nav-bar-icon fas fa-image" onClick={() => handleIconClick('gallery')} />
                        {theme === 'dark' ? <i className="nav-bar-icon fas fa-sun" onClick={handleThemeChange} /> : <i className="nav-bar-icon fas fa-moon" onClick={handleThemeChange} />}
                        <i className="nav-bar-icon fa fa-sign-out"
                            onClick={handleOnClick}
                        />
                    </div>
                }
            </div>
        </div>

    );
};

export default NavBar;