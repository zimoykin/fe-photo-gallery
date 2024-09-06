import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import NavBar from './components/nav-bar/nav-bar-component';
import { Login, Home } from './pages';
import { Settings } from './pages/settings/settings-page';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return (
    <>
      <Router>
        {isAuthenticated ? <NavBar /> : null}
        <div className='app-container'>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/settings" element={isAuthenticated ? <Settings /> : <Login />} />
            <Route path="*" element={isAuthenticated ? <Home /> : <Login />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;