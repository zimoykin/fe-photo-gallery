import React, { useState } from "react";
import "./styles/recovery-style.css";
import BackgroundWithImage from "../../components/background/background-component";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { apirecovery } from "../../api/login-api";
import CameraSpinnerModal from "../../components/camera-spinner/camera-spinner-modal.component";
import { apiRecovery } from "../../api/login-api";

export const RecoveryPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRecoveryClick = () => {
        if (email?.length > 0) {
            setIsLoading(true);
            apiRecovery(email).then(() => {
                toast.success('Recovery email sent');
                navigate('/login');
            }).catch((error) => {
                console.log(error);
                toast.error('Invalid email');
            }).finally(() => {
                setIsLoading(false);
            });
        } else {
            toast.error('Please enter email');
        }
    };


    return (
        <>
            <BackgroundWithImage />
            <div className="recovery-container global-background-layer shadow">
                <div className="recovery-box-title">
                    <h1 className="global-title scale-s">Write your email here</h1>
                </div>
                <div className="recovery-inputs-container">
                    <div className="recovery-box-input-code">
                        <input

                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="global-input shadow"
                            type="email" />
                    </div>

                    <div className="recovery-box-input-code">
                        <button
                            onClick={handleRecoveryClick}
                            className="global-button shadow scale-l" >
                            Send recovery link
                        </button>
                    </div>
                </div>
            </div>
            {isLoading && <CameraSpinnerModal />}
        </>
    );
};