import React from "react";
import FolderView from "../../components/folder/folder-view-component";
import BackgroundWithImage from "../../components/background/background-component";

const FolderPage: React.FC = () => {
    return (
        <>
        <BackgroundWithImage />
            <div className="page-container">
                <div className="page-box">
                    <FolderView />
                </div>
            </div>
        </>
    );
};

export default FolderPage;