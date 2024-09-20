import React, { } from 'react';
import './styles/home-style.css';
import BackgroundWithImage from '../../components/background/background-component';
import PhotoOfTheDay from '../../components/photo-of-the-day/photo-of-the-day-component';
import News from '../../components/news/news-component';
import UserCharts from '../../components/charts/charts';

export const HomePage: React.FC = () => {
    return (
        <>
            <BackgroundWithImage />
            <div className="page-container">
                <div className='page-box'>
                    <div className='home-page-content-left global-secondary-background-layer'>
                        <PhotoOfTheDay />
                        <UserCharts />
                    </div>
                    <div className='home-page-content-right global-secondary-background-layer'>
                        <div className='home-page-news-container'>
                            <News />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};