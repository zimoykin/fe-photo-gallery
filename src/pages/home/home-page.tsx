import React, { } from 'react';
import './styles/home-style.css';
import BackgroundWithImage from '../../components/background/background-component';
import PhotoOfTheDay from '../../components/photo-of-the-day/photo-of-the-day-component';
import CameraLensChart from '../../components/camera-lens-chart/camera-lens-chart.component';
import News from '../../components/news/news-component';

export const HomePage: React.FC = () => {


    return (
        <>
            <BackgroundWithImage />
            <div className="page-container home-page">
                <div className='home-page-container'>
                    <div className='home-page-content-left shadow global-background-layer'>
                        <PhotoOfTheDay />
                        <CameraLensChart />
                    </div>
                    <div className='home-page-content-right shadow global-secondary-background-layer'>
                        <div className='home-page-news-container'>
                            <News />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};