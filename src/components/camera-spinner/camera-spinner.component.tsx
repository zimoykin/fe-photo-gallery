import React from 'react';
import './camera-spinner-style.css';

const CameraSpinner: React.FC = () => {
  return (
    <div className="spinner">
      <div className="petal"></div>
      <div className="petal"></div>
      <div className="petal"></div>
      <div className="petal"></div>
      <div className="petal"></div>
      <div className="petal"></div>
    </div>
  );
};

export default CameraSpinner;
