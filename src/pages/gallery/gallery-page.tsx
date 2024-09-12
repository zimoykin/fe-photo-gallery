import React from 'react';
import Folders from "../../components/folder/folders-component";
import './gallery-style.css';

export const Gallery: React.FC = () => {
    return (
        <div className="page-gallery-container">
            <div className="gallery-box-container">
                <Folders />
            </div>
        </div>
    );
};