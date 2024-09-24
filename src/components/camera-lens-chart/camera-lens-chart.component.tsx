import React, { useState } from 'react';
import './styles/camera-lens-chart-style.css';

const CameraLensChart: React.FC = () => {
  const [selected, setSelected] = useState<'camera' | 'lens'>('camera');

  return (
    <div className="camera-lens-chart-container">
      <div className="camera-lens-chart-box">
        <div className="camera-lens-chart-group">
          <div className="camera-lens-cammand-panel">
            <div
              onClick={() => setSelected('camera')}
              className={`camera-lens-cammand-panel-camera 
                            ${selected === 'camera' ? 'palitra-tab-active shadow' : 'palitra-tab'}`}
            >
              <b className={` scale-l`}>camera</b>
            </div>

            <div
              onClick={() => setSelected('lens')}
              className={`camera-lens-cammand-panel-lens
                             ${selected === 'lens' ? 'palitra-tab-active shadow' : 'palitra-tab'}`}
            >
              <b className="scale-l">lens</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraLensChart;
