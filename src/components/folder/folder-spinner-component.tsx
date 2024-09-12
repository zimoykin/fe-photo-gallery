import React from "react";
import './styles/folders-style.css';

const FolderSpinnerComponent: React.FC = () => {
    return (
        <div className="folder-line folder-spinner"
            style={{
                backgroundColor: 'gray',
                height: '24vh',
                color: 'white',
            }}
        >
        </div>
    );
};
export default FolderSpinnerComponent;