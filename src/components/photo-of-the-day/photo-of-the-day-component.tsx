import React, { useEffect, useState } from "react";
import "./styles/photo-of-the-day-style.css";
import { apiGetPhotoOfTheDay } from "../../api/api-gallery";
import { toast } from "react-toastify";
import { IPhotoOfTheDay } from "../../interfaces/photo-of-the-day.interface";
import { useNavigate } from "react-router-dom";
import CameraSpinner from "../camera-spinner/camera-spinner.component";

const PhotoOfTheDay: React.FC = () => {
    const navigate = useNavigate();
    const [photo, setPhoto] = useState<IPhotoOfTheDay | null>(null);
    const [showPhotoOfTheDay, setShowPhotoOfTheDay] = useState(false);

    useEffect(() => {
        apiGetPhotoOfTheDay().then((photo) => {
            if (photo) setPhoto(photo);
        }).catch(error => {
            toast.error(error.message);
        })
    }, []);

    const handlePhotoOfTheDayClick = () => {
        if (!photo) return;
        navigate(`/gallery/${photo.userId}`);
    };


    return (
        <div className="photo-of-the-day-container">
            <div className="photo-of-the-day-box scale-s">
                {showPhotoOfTheDay && <div className="photo-of-the-day-box-text scale-m">
                    <h1> Photo of the day </h1>
                </div>}
                <img
                    onLoad={() => setShowPhotoOfTheDay(true)}
                    className="shadow" src={photo?.url} alt={photo?.camera} />
            </div>

            {showPhotoOfTheDay && <div className="photo-of-the-day-box-by-author-container">
                <div className="photo-of-the-day-box-group scale-s">
                    <div className="photo-of-the-day-box-by-author-left">
                        <i className="fas fa-heart scale-l"></i>
                        <span className="shadow">{photo?.likes}</span>
                    </div>
                    <div className="photo-of-the-day-box-by-author-right"
                        onClick={handlePhotoOfTheDayClick}
                    >
                        <div className="photo-of-the-day-box-by-author-right-text">
                            <i className="fas fa-camera scale-l"></i>
                            <span>{'Canon R8'}</span>
                        </div>
                        <span>by {"John Doe"}</span>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default PhotoOfTheDay;