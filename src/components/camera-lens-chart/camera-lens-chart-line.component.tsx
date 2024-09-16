import React from 'react';
import './styles/camera-lens-chart-line-style.css';
import { useNavigate } from 'react-router-dom';

interface Props {
    name: string;
    rating: number;
    type: 'camera' | 'lens';
}

const CameraLensChartLine: React.FC<Props> = ({ name, rating, type }: Props) => {

    const navigate = useNavigate();

    const handleRecordClick = () => {
        navigate(`/gallery-search?${type}=${name}`);
    };

    return (
        <div className='camera-lens-chart-line-container'>
            <div className='camera-lens-chart-line-box global-background-layer shadow scale-m'
                onClick={handleRecordClick}
            >
                <div className='camera-lens-chart-line-box-left'>
                    <span>{name}</span>
                </div>
                <div className='camera-lens-chart-line-box-right'>
                    <span>{rating}</span>
                </div>
            </div>
        </div>
    );
};


export default CameraLensChartLine;