import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login, Home } from './pages';
import { Settings } from './pages/settings/settings-page';
import { NavBarPage } from './pages/nav-bar-page/nav-bar-page';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <div className='app-container'>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/settings" element={
              <NavBarPage child={<Settings />}
              />}
            />
            <Route path="*" element={
              <NavBarPage child={<Home />} />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;