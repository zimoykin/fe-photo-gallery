import React from 'react';
import Folders from "../../components/folder/folders-component";
import './home-style.css';

export const Home: React.FC = () => {
    return (
        <div className="home-container">
            <div className="box-container">
                <Folders />
            </div>
        </div>
    );
};