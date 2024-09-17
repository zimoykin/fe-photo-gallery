import React from 'react';
import './styles/gallery-style.css';
import BackgroundWithImage from '../../components/background/background-component';
// import Folders from "../../components/folder/folders-component";
import GalleryV2 from '../../components/gallery-v2/gallery-component';

export const Gallery: React.FC = () => {
    return (<>
        <BackgroundWithImage />
        <div id='container' className="page-container">
            <div className='gallery-box-container'>
                <GalleryV2 />
            </div>
        </div>
    </>
    );
};