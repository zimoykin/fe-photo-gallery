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

  return (
    <nav className="nav-bar-container">
      <div className="nav-bar-command-panel ">
        {/* left constant */}
        <div className="w-50 flex align-left-center">
          <i className="nav-bar-icon fas fa-home" onClick={() => navigate('/home')} />
          <i
            className="nav-bar-icon fa-solid fa-bell"
            onClick={() =>
              toast.info('This feature is not implemented yet! 😵‍💫', { toastId: 'notification' })
            }
          />

          {theme === 'dark' ? (
            <i className="nav-bar-icon fas fa-sun" onClick={handleThemeChange} />
          ) : (
            <i className="nav-bar-icon fas fa-moon" onClick={handleThemeChange} />
          )}
        </div>

        {/* right dynamic */}

        <div className="nav-bar-command-panel ">
          {isAuthenticated && (
            <i
              onClick={() => navigate(`/gallery/${profile?.id}`)}
              className="nav-bar-icon fas fa-image"
            />
          )}
          {isAuthenticated && (
            <i className="nav-bar-icon fas fa-user" onClick={() => navigate(`/settings`)} />
          )}

          {isAuthenticated ? (
            <i className="nav-bar-icon fa fa-sign-out" onClick={handleOnClickLogOut} />
          ) : (
            !isAuthenticated && (
              <i className="nav-bar-icon fas fa-key" onClick={() => navigate('/login')} />
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
