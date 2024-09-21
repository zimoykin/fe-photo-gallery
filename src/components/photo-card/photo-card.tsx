import React, { useState } from "react";
import './photo-card-style.css';
import { IPhotoWithImageFile } from "../../interfaces/photo.interface";
import { ApiClient } from "../../api/networking/api-client";
import CameraSpinner from "../camera-spinner/camera-spinner.component";

interface Props {
    photo: IPhotoWithImageFile;
    showEditBtns?: true;
    needRefresh?: () => void;
    removePhotoFromList?: () => void;
}

const PhotoCard: React.FC<Props> = ({ photo, showEditBtns, needRefresh, removePhotoFromList }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(photo.id ? false : true);

    const handleFavoriteClick = () => {
        if (photo.folderId && photo.id) {
            setIsLoading(true);
            ApiClient.put(`/photos/${photo.folderId}/${photo.id}`, { ...photo, favorite: photo.favorite ?? true }).finally(() => setIsLoading(false))
                .then(needRefresh)
                .catch(console.log);
        }
    };

    const handleDeleteClick = () => {
        if (photo.id) {
            setIsLoading(true);
            ApiClient.delete(`/photos/${photo.folderId}/${photo.id}`)
                .finally(() => setIsLoading(false))
                .then(needRefresh)
                .catch(console.error);
        } else {
            if (removePhotoFromList) removePhotoFromList();
        }
    };

    const handleSaveClick = () => {
        if (photo.id) {
            setIsLoading(true);
            ApiClient.put(`/photos/${photo.folderId}/${photo.id}`, photo).finally(() => setIsLoading(false))
                .then(needRefresh);
        }
        else if (photo.folderId) {
            if (photo.file) {
                setIsLoading(true);
                const formData = new FormData();
                formData.append('file', photo.file);
                formData.append('camera', photo.camera ?? '');
                formData.append('lens', photo.lens ?? '');
                formData.append('location', photo.location ?? '');
                formData.append('description', photo.description ?? '');
                formData.append('film', photo.film ?? '');
                formData.append('iso', photo.iso ?? '');
                formData.append('profileId', photo.profileId ?? '');
                formData.append('folderId', photo.folderId);
                formData.append('favorite', photo.favorite?.toString() ?? 'false');
                formData.append('sortOrder', photo.sortOrder?.toString() ?? '0');
                ApiClient.postUpload(`/photos/${photo.folderId}`, formData)
                    .finally(() => {
                        setIsEditMode(false);
                        setIsLoading(false);
                    })
                    .then(needRefresh);
            }
        }
    };

    return (
        <>
            <div className={`scale-s photo-card-container flex-center flex-column p-3 pb-20 shadow ${photo.id ? '': 'photo-card-new-element'}`}>
                {isLoading ? <CameraSpinner /> :
                    <> <div className="no-repeat radius-10"
                        style={{
                            width: '30vh',
                            height: '30vh',
                            backgroundImage: `url(${photo.url})`,
                        }}
                    />

                        <div className="flex-row w-100 ">
                            <div className="flex-column w-90 pt-10">
                                <div className="">
                                    {!isEditMode ? <span className="photo-card-description">
                                        {photo.camera}
                                    </span>

                                        : <input
                                            value={photo.camera}
                                            onChange={e => photo.camera = e.target.value}
                                            className="w-100 palitra-4" />}
                                </div>
                                <div className="">
                                    {!isEditMode ? <span className="photo-card-description">
                                        {photo.lens}
                                    </span>
                                        : <input
                                            value={photo.lens}
                                            onChange={e => photo.lens = e.target.value}
                                            className="w-100 palitra-4" />
                                    }
                                </div>
                                <div className="">
                                    {!isEditMode ? <span className="photo-card-description">
                                        {photo.location || 'no location'}
                                    </span> :
                                        <input
                                            value={photo.location}
                                            onChange={e => photo.location = e.target.value}
                                            className="w-100 palitra-4" />
                                    }
                                </div>

                                <div className="">
                                    {!isEditMode ? <span className="photo-card-description">
                                        {photo.film || ''}
                                    </span> :
                                        <input
                                            placeholder="film"
                                            value={photo.film}
                                            onChange={e => photo.film = e.target.value}
                                            className="w-100 palitra-4" />
                                    }
                                </div>
                            </div>

                            {showEditBtns && <div className="flex-column w-10 align-right-top pt-10">
                                <div className="p-1 hover-bg scale-l"
                                    onClick={handleFavoriteClick}
                                >
                                    <span className="photo-card-description">
                                        {photo.id && <i className="fas fa-star" style={{ color: `${photo.favorite === true ? 'gold' : 'gray'}` }} />}
                                    </span>
                                </div>

                                <div className="p-1 hover-bg">
                                    <span className="photo-card-description">
                                        {!isEditMode && <i
                                            onClick={() => setIsEditMode(true)}
                                            className="fas fa-pen" />}
                                        {isEditMode && <i
                                            onClick={handleSaveClick}
                                            className="fas fa-save" />}
                                    </span>
                                </div>
                                <div className="p-1 hover-bg"
                                    onClick={handleDeleteClick}>
                                    <span className="photo-card-description">
                                        <i className="fas fa-trash" style={{ color: `tomato` }} />
                                    </span>
                                </div>
                            </div>}
                        </div>
                    </>}
            </div>

        </>
    );
};


export default PhotoCard;