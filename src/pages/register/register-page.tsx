import React, { useState } from 'react';
import './styles/register-style.css';
import BackgroundWithImage from '../../components/background/background-component';
import Palitra from '../../components/palitra/palitra-component';
import { toast } from 'react-toastify';
import { apiRegister } from '../../api/login-api';
import CameraSpinnerModal from '../../components/camera-spinner/camera-spinner-modal.component';
import { useNavigate } from 'react-router-dom';
import { validatePassword } from '../../shared/password-validate.helper';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterClick = () => {
    if (!name?.length) {
      toast.error('Please enter name');
      return;
    }
    if (!email?.length) {
      toast.error('Please enter email');
      return;
    }

    if (!password?.length) {
      toast.error('Please enter password');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        'Password must contain at least one uppercase letter, one number, and one special character'
      );
      return;
    }

    setIsLoading(true);

    apiRegister(email, password, name)
      .then(() => {
        toast.success('Registration successful, check your email for confirmation');
        navigate('/login');
      })
      .catch((error) => {
        toast.error('Registration failed');
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <BackgroundWithImage />
      <div className="register-page-container-top">
        <div className="w-80 register-page-box">
          <Palitra />
        </div>
      </div>
      <div className="register-page-container global-background-layer shadow">
        <div className="register-page-container-left global-secondary-background-layer shadow">
          <div className="register-page-nice-to-meet-you">
            <h1>Nice to meet you</h1>
          </div>
          <div className="register-page-inputs">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="global-input shadow"
              type="text"
              placeholder="Name"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="global-input shadow"
              type="email"
              placeholder="Email"
            />
            <br />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="global-input shadow"
              type="password"
              placeholder="Password"
            />
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="global-input shadow"
              type="password"
              placeholder="Confirm password"
            />
            <br />
            <button onClick={handleRegisterClick} className="global-button shadow">
              Register
            </button>
          </div>
        </div>
        <div className="register-page-container-right">
          <Palitra />
        </div>
      </div>
      {isLoading && <CameraSpinnerModal />}
    </>
  );
};
