import React, { useEffect, useState } from 'react';
import './styles/news-style.css';
import CameraSpinner from '../camera-spinner/camera-spinner.component';
import { fake_news } from './fake-news';

const News: React.FC = () => {

    const [news, setNews] = useState<{ topic: string, content: string; url: string; }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setNews(fake_news);
        }, 2400);
    }, [setNews]);

    return (
        <div className='news-container'>
            <div className='news-box'>
                {news?.map((item, index) => (
                    <div className='news-box-item-group' key={index}>
                        <div className='news-box-item global-background-layer shadow'>
                            <div className='news-box-item-title-box'>
                                <div className='news-box-item-title-box-author '>
                                    <img className='news-box-item-title-box-author-img shadow scale-s' src="/ava-mock.jpg" alt="" />
                                </div>
                                <div className='news-box-item-title-box-news-title scale-m'>
                                    <h1>{item.topic}</h1>
                                </div>
                            </div>
                            <img className='shadow scale-s' src={item.url} alt="" />
                            <span>{item.content}</span>
                        </div>
                    </div>

                ))
                }
            </div>
            <div className='flex-center h-100'>
                {isLoading && <CameraSpinner />}
            </div>
        </div >
    );
};

export default News;