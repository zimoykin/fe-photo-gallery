import React, { useState } from "react";
import './styles/camera-lens-chart-style.css';
import CameraLensChartLine from "./camera-lens-chart-line.component";

const CameraLensChart: React.FC = () => {

    const [selected, setSelected] = useState<'camera' | 'lens'>('camera');

    const charts = {
        cameras: [
            {
                "name": "Sony Alpha 7 IV",
                "rating": 9.5
            },
            {
                "name": "Canon EOS R5",
                "rating": 9.8
            },
            {
                "name": "Nikon Z9",
                "rating": 9.7
            },
            {
                "name": "Fujifilm X-T5",
                "rating": 8.9
            },
            {
                "name": "Panasonic Lumix S5 II",
                "rating": 8.7
            }
        ],
        lenses: [
            {
                "name": "Sony FE 24-70mm f/2.8 GM II",
                "rating": 9.6
            },
            {
                "name": "Canon RF 50mm f/1.2L USM",
                "rating": 9.9
            },
            {
                "name": "Nikon Z 24-70mm f/2.8 S",
                "rating": 9.7
            },
            {
                "name": "Sigma 35mm f/1.4 DG DN Art",
                "rating": 9.4
            },
            {
                "name": "Tamron 28-75mm f/2.8 Di III VXD G2",
                "rating": 9.3
            }
        ]
    };



    return (
        <div className="camera-lens-chart-container">
            <div className="camera-lens-chart-box">
                <div className="camera-lens-chart-group">
                    <div className="camera-lens-cammand-panel">
                        <div
                            onClick={() => setSelected('camera')}
                            className={
                                `camera-lens-cammand-panel-camera 
                            ${selected === 'camera' ? 'palitra-tab-active shadow' : 'palitra-tab'}`}>
                            <b
                                className={` scale-l`}
                            >camera</b>
                        </div>

                        <div
                            onClick={() => setSelected('lens')}
                            className={
                                `camera-lens-cammand-panel-lens
                             ${selected === 'lens' ? 'palitra-tab-active shadow' : 'palitra-tab'}`
                            }>
                            <b
                                className='scale-l'
                            >lens</b>
                        </div>

                    </div>

                    <div className="camera-lens-chart-group-table">
                        {charts[selected === 'camera' ? 'cameras' : 'lenses'].map((chart, index) => (
                            <CameraLensChartLine key={index} type={selected} name={chart.name} rating={chart.rating} />
                        ))}
                    </div>
                </div>

            </div>
        </div >

    );
};



export default CameraLensChart;