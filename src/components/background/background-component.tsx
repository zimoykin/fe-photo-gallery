import React from 'react';
import './styles/background-style.css';

const BackgroundWithImage: React.FC = () => {
  return (
    <>
      <div className="page-container bg-img-container">
        <div className="global-background-layer">
          <div className="bg-vignette"></div>
          <div className="bg-layer-container">
            <div className="bg-layer-column" />
            <div className="bg-layer-column" />
            <div className="bg-layer-column" />
            <div className="bg-layer-column" />
            <div className="bg-layer-column" />
            <div className="bg-layer-column" />
            <div className="bg-layer-column" />
            <div className="bg-layer-column" />
            <div className="bg-layer-column" />
            <div className="bg-layer-column" />
          </div>
        </div>
      </div>
      <footer className="bg-footer">
        <span>{`© ${new Date().getFullYear()} | Dmitrii Zimoikin 🧑‍💻`}</span>
      </footer>
    </>
  );
};
export default BackgroundWithImage;
