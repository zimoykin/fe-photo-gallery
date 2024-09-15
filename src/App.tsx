import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/palitra.css';
import './styles/width-height.css';
import './styles/text-tags.css';
import './styles/icons.css';
import { Gallery, Home, LoginV2Page, NavBarPage, Settings, UploadImagesPage } from './pages';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <div className='app-container'>
          <Routes>
            <Route path="/login" element={<LoginV2Page />} />
            <Route path="/settings" element={
              <NavBarPage child={<Settings />}
              />}
            />
            <Route path="/gallery/:userId" element={
              <NavBarPage child={<Gallery />}
              />}
            />
            <Route path="/settings/upload/:folderId" element={
              <NavBarPage child={<UploadImagesPage />} />}
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