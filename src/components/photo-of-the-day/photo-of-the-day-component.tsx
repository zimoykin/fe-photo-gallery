import React, { useEffect, useState } from 'react';
import './styles/photo-of-the-day-style.css';
import { toast } from 'react-toastify';
import { IPhotoOfTheDay } from '../../interfaces/photo-of-the-day.interface';
import { useNavigate } from 'react-router-dom';
import { ApiClient } from '../../api/networking/api-client';

const PhotoOfTheDay: React.FC = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<IPhotoOfTheDay | null>(null);

  useEffect(() => {
    ApiClient.get<IPhotoOfTheDay>('/public/photos/photo-of-the-day')
      .then((photo) => {
        if (photo) {
          setPhoto(photo);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const handlePhotoOfTheDayClick = () => {
    if (!photo) return;
    navigate(`/gallery/${photo.profile.id}`);
  };

  return (
    <div className="photo-of-the-day-container">
      <div className="photo-of-the-day-box p-10 scale-s">
        <div
          className="photo-of-the-day-box-img shadow"
          style={{ backgroundImage: `url(${photo?.photo.url ?? '/no-photo.jpeg'})` }}
        >
          <div className="photo-of-the-day-box-text p-10 scale-m">
            {photo && <span> Photo of the day </span>}
            {!photo && <span> There is no photo of the day </span>}
          </div>
        </div>
      </div>

      <div className="photo-of-the-day-box-by-author-container">
        <div className="photo-of-the-day-box-group p-10 scale-s">
          <div className="photo-of-the-day-box-by-author-left">
            <i className="fas fa-heart scale-l p-3" />
            <span className="shadow">{photo?.photo.likes ?? 0}</span>
          </div>
          <div className="photo-of-the-day-box-by-author-right" onClick={handlePhotoOfTheDayClick}>
            <div className="photo-of-the-day-box-by-author-right-text">
              <i className="fas fa-camera scale-l p-3" />
              <span>{photo?.photo?.camera}</span>
            </div>
            <span> by {photo?.profile.name ?? 'Unknown'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoOfTheDay;
