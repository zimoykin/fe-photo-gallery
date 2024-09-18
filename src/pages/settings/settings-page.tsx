import React from "react";
import './styles/settings-style.css';
import UserSettings from "../../components/user-settings/user-settings-component";
import BackgroundWithImage from "../../components/background/background-component";

export const Settings: React.FC = () => {
    return <>
        <BackgroundWithImage />
        <div className="settings-container">
            <UserSettings />
        </div>
    </>;
};