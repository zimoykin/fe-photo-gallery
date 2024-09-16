import React, { useState } from "react";
import "./styles/recovery-confirm-style.css";
import BackgroundWithImage from "../../components/background/background-component";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import CameraSpinnerModal from "../../components/camera-spinner/camera-spinner-modal.component";
import { apiRecoveryConfirm } from "../../api/login-api";

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

        if (code?.length > 0) {
            setIsLoading(true);
            apiRecoveryConfirm(token, code, password).then(() => {
                navigate('/login');
            }).catch((error) => {
                console.log(error);
                toast.error('Invalid code or token');
            }).finally(() => {
                setIsLoading(false);
            });
        } else {
            toast.error('Please enter code or password');
        }
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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