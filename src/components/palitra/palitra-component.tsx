import React from 'react';
import './palitra-style.css';
import { useTheme } from '../../contexts/theme/theme-context';
import { useDispatch } from 'react-redux';
import { toDark, toLight } from '../../features/thema/thema-slice';

const Palitra: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    dispatch(theme === 'light' ? toDark() : toLight());
  };

  return (
    <>
      <>
        <div className="app-container-palitra palitra-1" onClick={handleThemeChange} />
        <div className="app-container-palitra palitra-2 " onClick={handleThemeChange} />
        <div className="app-container-palitra palitra-3 " onClick={handleThemeChange} />
        <div className="app-container-palitra palitra-4 " onClick={handleThemeChange} />
        <div className="app-container-palitra palitra-5 " onClick={handleThemeChange} />
        <div className="app-container-palitra palitra-6 " onClick={handleThemeChange} />
      </>
    </>
  );
};

export default Palitra;
