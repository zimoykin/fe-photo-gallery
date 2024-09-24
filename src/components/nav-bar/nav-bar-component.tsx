import React from 'react';
import './nav-bar-style.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/auth-slice';
import { useTheme } from '../../contexts/theme/theme-context';
import { toDark, toLight } from '../../features/thema/thema-slice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { dropFolders } from '../../features/folders/folders-slice';
import { dropProfile } from '../../features/profile/profile-slice';
import { ApiClient } from '../../api/networking/api-client';
import { toast } from 'react-toastify';

const NavBar: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const { profile } = useSelector((state: RootState) => state.profile);

  const handleOnClickLogOut = async () => {
    await ApiClient.post<string>('profiles/logout');
    dispatch(dropFolders());
    dispatch(dropProfile());
    dispatch(logout());
  };

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    dispatch(theme === 'light' ? toDark() : toLight());
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.info('This feature is not implemented yet! 😵‍💫', { toastId: 'search' });
  };

  return (
    <nav className="nav-bar-container">
      <div className="nav-bar-command-panel pt-3 pb-3 shadow">
        {/* left */}
        <div className="flex align-left-center gap">
          <i className="shadow nav-bar-icon fas fa-home" onClick={() => navigate('/home')} />

          <form 
          className='nav-bar-search shadow'
          onSubmit={handleSearch}>
            <input
            onFocus={(e) => e.target.select()}
              onSubmit={(e) => {
                toast.info('This feature is not implemented yet! 😵‍💫', { toastId: 'search' });
              }}
              className='nav-bar-search-input radius-5 p-3 w-100 palitra-6' type="text" placeholder="Search..."
            />
          </form>
        </div>

        {/* right */}

        <div className="nav-bar-command-panel ">
          <i
            className="shadow nav-bar-icon fa-solid fa-bell"
            onClick={() =>
              toast.info('This feature is not implemented yet! 😵‍💫', { toastId: 'notification' })
            }
          />
          {isAuthenticated && (
            <i
              onClick={() => navigate(`/gallery/${profile?.id}`)}
              className="shadow nav-bar-icon fas fa-image"
            />
          )}
          {isAuthenticated && (
            <i className="shadow nav-bar-icon fas fa-user" onClick={() => navigate(`/settings`)} />
          )}


          {theme === 'dark' ? (
            <i className="shadow nav-bar-icon fas fa-sun" onClick={handleThemeChange} />
          ) : (
            <i className="shadow nav-bar-icon fas fa-moon" onClick={handleThemeChange} />
          )}

          {isAuthenticated ? (
            <i className="shadow nav-bar-icon fa fa-sign-out" onClick={handleOnClickLogOut} />
          ) : (
            !isAuthenticated && (
              <i className="shadow nav-bar-icon fas fa-key" onClick={() => navigate('/login')} />
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
