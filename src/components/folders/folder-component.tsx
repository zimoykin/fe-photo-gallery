import React, { useEffect, useState } from 'react';
import './styles/folder-style.css';
import { IUserFolder } from '../../interfaces/folder.interface';
import { useNavigate } from 'react-router-dom';

interface Props {
    folder: IUserFolder;
}

const FolderV2: React.FC<Props> = ({ folder }) => {

    const navigate = useNavigate();
    const [preview, setPreview] = useState<string>();

    useEffect(() => {
        if (folder) {
            setTimeout(() => {
                setPreview('/bg/mobile-bg.jpeg');
            }, 3000);
        }
    });

    return (
        <div className="folder-container">
            <div className='folder-box shadow scale-m'
                onClick={() => navigate(`${folder.profileId}/folder/${folder.id}`)}
            >
                <div className='folder-image-bg'>
                    <img src={preview} alt="" />
                </div>
                <div className='folder-title'
                    style={{
                        backgroundColor: folder.bgColor,
                        color: folder.color,
                    }}>
                    <h1>{folder.title}</h1>
                </div>
            </div>
        </div>
    );
};

export default FolderV2;