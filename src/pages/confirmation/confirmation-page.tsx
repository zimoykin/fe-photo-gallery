import React, { useState } from "react";
import "./styles/confirmation-style.css";
import BackgroundWithImage from "../../components/background/background-component";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiConfirmation } from "../../api/login-api";
import CameraSpinnerModal from "../../components/camera-spinner/camera-spinner-modal.component";

export const ConfirmationPage: React.FC = () => {

    const [code, setCode] = useState('');
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleConfirmClick = () => {
        const confirmationToken = searchParams.get('token');
        if (confirmationToken && code?.length > 0) {
            setIsLoading(true);
            apiConfirmation(confirmationToken, code).finally(() => {
                setIsLoading(false);
            }).catch((error) => {
                console.log(error);
                toast.error('Invalid code');
            }).then(() => {
                toast.success('Code confirmed');
                navigate('/login');
            });
        }
        else {
            toast.error('Please enter code');
        }
    };

    return (
        <>
            <BackgroundWithImage />
            <div className="confirmation-container global-background-layer shadow">
                <div className="confirmation-box-title">
                    <h1 className="global-title scale-s">Write your code here</h1>
                </div>
                <div className="confirmation-inputs-container">
                    <div className="confirmation-box-input-code">
                        <input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="global-input shadow" type="text" />
                    </div>

                    <div className="confirmation-box-input-code">
                        <button
                            onClick={handleConfirmClick}
                            className="global-button shadow scale-l" >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
            {isLoading && <CameraSpinnerModal />}
        </>
    );
};