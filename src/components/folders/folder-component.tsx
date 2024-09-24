import React, { useEffect, useState } from 'react';
import './styles/folder-style.css';
import { IUserFolder } from '../../interfaces/folder.interface';
import { useNavigate } from 'react-router-dom';
import CameraSpinner from '../camera-spinner/camera-spinner.component';

interface Props {
  folder: IUserFolder;
}

const FolderV2: React.FC<Props> = ({ folder }) => {
  const navigate = useNavigate();
  const [loadImg, setLoadImg] = useState<string | null>(null);

  useEffect(() => {
    if (folder.url) {
      const img = new Image();
      img.src = folder.url;
      img.onload = () => setLoadImg(img.src);
      img.onerror = () => console.error('Failed to load image');
    } else setLoadImg('/no-photo.jpeg');
  }, [folder.url]);

  return (
    <div className="folder-container">
      <div
        className="folder-box shadow scale-m"
        onClick={() => navigate(`/folder/${folder.profileId}/${folder.id}`)}
      >
        {!loadImg && (
          <div className="">
            <CameraSpinner />
          </div>
        )}
        {loadImg && (
          <div
            className="folder-image-bg palitra-5 folder-image-bg"
            style={{ backgroundImage: `url(${loadImg})` }}
          />
        )}

        <div
          className="folder-title"
          style={{
            backgroundColor: folder.bgColor,
            color: folder.color
          }}
        >
          <h1>{folder.title}</h1>
        </div>
      </div>
    </div>
  );
};

export default FolderV2;
