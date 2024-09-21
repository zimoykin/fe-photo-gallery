import React from 'react';
import './camera-spinner-style.css';

const CameraSpinner: React.FC = () => {
  return (
    <div className='flex-center'>
      <div className="spinner">
        <div className='spinner-box'>
          <div className="petal"></div>
          <div className="petal"></div>
          <div className="petal"></div>
          <div className="petal"></div>
          <div className="petal"></div>
          <div className="petal"></div>
        </div>
      </div>
    </div>
  );
};

export default CameraSpinner;
