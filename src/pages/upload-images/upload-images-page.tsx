import React from "react";
import UploadImages from "../../components/upload-images/header-folder-component";
import BackgroundWithImage from "../../components/background/background-component";

export const UploadImagesPage: React.FC = () => {
    return <>
        <BackgroundWithImage />
        <div className="page-container">
            <div className="page-box">
                <UploadImages />
            </div>
        </div>
    </>
        ;
};