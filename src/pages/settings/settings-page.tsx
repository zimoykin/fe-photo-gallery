import React from "react";
import UserSettings from "../../components/user-settings/user-settings-component";
import BackgroundWithImage from "../../components/background/background-component";

export const Settings: React.FC = () => {
    return <>
        <BackgroundWithImage />
        <div className="page-container">
            <div className="page-box">
                <UserSettings />
            </div>
        </div>
    </>;
};