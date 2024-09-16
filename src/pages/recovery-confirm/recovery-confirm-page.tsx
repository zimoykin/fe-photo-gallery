import React, { useState } from "react";
import "./styles/recovery-confirm-style.css";
import BackgroundWithImage from "../../components/background/background-component";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import CameraSpinnerModal from "../../components/camera-spinner/camera-spinner-modal.component";
import { apiRecoveryConfirm } from "../../api/login-api";
import { validatePassword } from "../../shared/password-validate.helper";

export const RecoveryConfirmPage: React.FC = () => {
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [searchParams] = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRecoveryConfirmClick = () => {

        const token = searchParams.get('token');

        if (!token) {
            toast.error('Invalid token');
            return;
        }

        if (!code?.length) {
            toast.error('Please enter code, you can find it in your email');
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
            toast.error('Password must contain at least one uppercase letter, one number, and one special character');
            return;
        }


        setIsLoading(true);
        apiRecoveryConfirm(token, code, password).then(() => {
            navigate('/login');
        }).catch((error) => {
            console.log(error);
            toast.error('Invalid code or token');
        }).finally(() => {
            setIsLoading(false);
        });
    };


    return (
        <>
            <BackgroundWithImage />
            <div className="recovery-confirm-container global-background-layer shadow">
                <div className="recovery-confirm-box-title">
                    <h1 className="global-title scale-s">Confirm your recovery</h1>
                </div>
                <div className="recovery-confirm-inputs-container">
                    <div className="recovery-confirm-box-input-code">
                        <input
                            placeholder="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="global-input shadow"
                            type="text" />
                    </div>

                    <div className="recovery-confirm-box-input-code">
                        <input
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="global-input shadow"
                            type="password" />
                    </div>

                    <div className="recovery-confirm-box-input-code">
                        <input
                            placeholder="confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="global-input shadow"
                            type="password" />
                    </div>

                    <div className="recovery-confirm-box-input-code">
                        <button
                            onClick={handleRecoveryConfirmClick}
                            className="global-button shadow scale-l" >
                            Confirm recovery
                        </button>
                    </div>
                </div>
            </div>
            {isLoading && <CameraSpinnerModal />}
        </>
    );
};