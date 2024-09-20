import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import './styles/palitra.css';
import './styles/fonts.css';
import './styles/sizes.css';
import './styles/icons.css';
import './styles/display.css';
import './styles/pages.css';
import './styles/tables.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Gallery, HomePage, LoginV2Page, NavBarPage, RegisterPage, Settings, UnavailablePage, UploadImagesPage, ConfirmationPage, RecoveryPage } from './pages';
import { RecoveryConfirmPage } from './pages/recovery-confirm/recovery-confirm-page';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <div className='app-container'>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/login" element={<LoginV2Page />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/recovery" element={<RecoveryPage />} />
            <Route path="/recovery/confirm" element={<RecoveryConfirmPage />} />
            <Route path="/settings" element={
              <NavBarPage secure={true} child={<Settings />}
              />}
            />
            <Route path="/gallery/:profileId" element={
              <NavBarPage child={<Gallery />}
              />}
            />
            <Route path="/home" element={
              <NavBarPage child={<HomePage />} />}
            />
            <Route path="/settings/upload/:folderId" element={
              <NavBarPage secure={true} child={<UploadImagesPage />} />}
            />
            <Route path="*"
              element={<UnavailablePage />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;