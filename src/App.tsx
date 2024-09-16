import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/palitra.css';
import './styles/fonts.css';
import './styles/sizes.css';
import './styles/icons.css';
import './styles/display.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Gallery, HomePage, LoginV2Page, NavBarPage, RegisterPage, Settings, UnavailablePage, UploadImagesPage, ConfirmationPage, RecoveryPage } from './pages';
import { RecoveryConfirmPage } from './pages/recovery-confirm/recovery-confirm-page';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <div className='app-container'>
          <Routes>
            <Route path="/login" element={<LoginV2Page />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/recovery" element={<RecoveryPage />} />
            <Route path="/recovery/confirm" element={<RecoveryConfirmPage />} />
            <Route path="/settings" element={
              <NavBarPage child={<Settings />}
              />}
            />
            <Route path="/gallery/:userId" element={
              <NavBarPage child={<Gallery />}
              />}
            />
            <Route path="/home" element={
              <NavBarPage child={<HomePage />} />}
            />
            <Route path="/settings/upload/:folderId" element={
              <NavBarPage child={<UploadImagesPage />} />}
            />
            <Route path="*" element={
              <NavBarPage child={<UnavailablePage />} />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;