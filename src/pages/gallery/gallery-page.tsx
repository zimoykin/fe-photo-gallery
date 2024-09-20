import React from 'react';
import BackgroundWithImage from '../../components/background/background-component';
import GalleryV2 from '../../components/gallery-v2/gallery-component';

export const Gallery: React.FC = () => {
    return (<>
        <BackgroundWithImage />
        <div className="page-container">
            <div className='page-box'>
                <GalleryV2 />
            </div>
        </div>
    </>
    );
};