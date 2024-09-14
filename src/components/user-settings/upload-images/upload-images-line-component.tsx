import React, { useEffect, useState } from 'react';
import './styles/upload-images-line-style.css';
import { apiDeletePhotoByIdAndFolderId, apiUploadPhoto, IPhoto } from '../../../api/api-gallery';
import CameraSpinnerModal from '../../camera-spinner/camera-spinner-modal.component';

interface Props {
    imageUrl: string;
    onRemove: () => void;
    onUpload: (photo: IPhoto) => void;
    camera: string;
    lens: string;
    iso: string;
    film: string;
    location: string;
    descr: string;
    photoId: string;
    folderId: string;
    file?: File;
    sortOrder: number;
}

const UploadImagesLine: React.FC<Props> = (params: Props) => {

    const [camera, setCamera] = useState(params.camera);
    const [descr, setDescr] = useState(params.descr);
    const [lens, setLens] = useState(params.lens);
    const [iso, setIso] = useState(params.iso);
    const [location, setLocation] = useState(params.location);
    const [film, setFilm] = useState(params.film);
    const [isUpdated, setIsUpdated] = useState(params.photoId === '');

    const [isLoading, setIsLoading] = useState(false);

    const handleSaveButtonClick = async () => {
        if (params.file) {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('file', params.file);
            formData.append('camera', camera);
            formData.append('film', film);
            formData.append('lens', lens);
            formData.append('sortOrder', params.sortOrder.toString());
            formData.append('iso', iso.toString());
            formData.append('location', location);

            return apiUploadPhoto(formData, params.folderId)
                .then((data) => {
                    if (data) {
                        params.onUpload(data);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    const handleRemoveButtonClick = () => {
        if (params.photoId !== '' && params.folderId !== '') {
            setIsLoading(true);
            apiDeletePhotoByIdAndFolderId(params.folderId, params.photoId).finally(() => {
                setIsLoading(false);
                params.onRemove();
            });
        }
    };

    useEffect(() => {
        if (params.photoId === '') {
            setIsUpdated(true);
            return;
        }
        if (camera !== params.camera || descr !== params.descr || lens !== params.lens || iso !== params.iso || location !== params.location || film !== params.film) {
            setIsUpdated(true);
        } else {
            setIsUpdated(false);
        }
    }, [camera, descr, lens, iso, location, film, params.camera, params.descr, params.lens, params.iso, params.location, params.film, params.photoId]);

    return (
        <>
            <div
                className="upload-images-table-line"
            >
                <img className='upload-images-images-container-img' src={params.imageUrl} alt="" />
                <div className='upload-images-images-container-column'>
                    <input placeholder='description' value={descr} onChange={(e) => setDescr(e.target.value)} />
                </div>
                <div className='upload-images-images-container-column'>
                    <input placeholder='camera' value={camera} onChange={(e) => setCamera(e.target.value)} />
                    <input placeholder='lens' value={lens} onChange={(e) => setLens(e.target.value)} />
                </div>
                <div className='upload-images-images-container-column'>
                    <input placeholder='film' value={film} onChange={(e) => setFilm(e.target.value)} />
                    <input placeholder='iso' value={iso} onChange={(e) => setIso(e.target.value)} />
                </div>
                <div className='upload-images-images-container-column'>
                    <input placeholder='location' value={location} onChange={(e) => setLocation(e.target.value)} />
                    <div className='upload-images-images-container-buttons'>
                        {isUpdated && <button
                            onClick={handleSaveButtonClick}
                            style={{ backgroundColor: 'lightgreen', fontSize: '12px' }}> SAVE </button>}
                        {params.photoId !== '' && <button
                            onClick={handleRemoveButtonClick}
                            style={{ backgroundColor: 'coral', fontSize: '12px' }} > DELETE </button>}
                    </div>
                </div>
            </div>
            {isLoading && <CameraSpinnerModal />}
        </>
    );
};

export default UploadImagesLine;