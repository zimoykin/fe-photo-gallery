import React from "react";
import BackgroundWithImage from "../../components/background/background-component";
import "./unavailable-page-style.css";

export const UnavailablePage: React.FC = () => {
    return (
        <>
            <BackgroundWithImage />
            <div className="unavailable-page-container">
                <h1 className="global-title scale-s">404: Page not found</h1>
                <a className="scale-l" href="/home"> <span> Go on home page </span> </a>
            </div>
        </>
    );
};