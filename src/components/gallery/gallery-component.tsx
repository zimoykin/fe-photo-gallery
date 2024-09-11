import React, { useState, useEffect } from 'react';
import './gallery-style.css';
import './gallery-table-style.css';
import ImageModal from './image-component';
import { apiFetchGalleryByFolderId, apiFetchPhotoById, IPhoto } from '../../api/api-gallery';
import CameraSpinner from '../camera-spinner/camera-spinner.component';

interface Props {
    folderId: string;
}

const Gallery: React.FC<Props> = ({ folderId }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<IPhoto[]>([]);
    const [showImage, setShowImage] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 10_000);
        apiFetchGalleryByFolderId(folderId, 'preview').then((images) => {
            setImages(images);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [folderId]);

    const handleImgClick = async (folderId: string, photoId: string) => {
        setShowImage(
            images[images.findIndex(image => image.id === photoId)
            ].url);
        const photo = await apiFetchPhotoById(folderId, photoId);
        if (photo) {
            setShowImage(photo.url);
        }
    };

    const handlePrevClick = () => {
        const index = images.findIndex(image => image.url === showImage);
        if (index > 0) {
            setShowImage(images[index - 1].url);
        }
    };

    const handleNextClick = () => {
        const index = images.findIndex(image => image.url === showImage);
        if (index < images.length - 1) {
            setShowImage(images[index + 1].url);
        }
    };

    return (
        <>
            <div className="gallery-container"
                onClick={(ev) => { ev.stopPropagation(); }}
            >
                {isLoading && <div className="gallery-spinner"><CameraSpinner /></div>}

                <div className="gallery-row">
                    {images.map((image, index) => (
                        <div key={index} className='gallery-image-card' onClick={() => image?.id && handleImgClick(image.folderId!, image.id)}>
                            <img src={image.url} alt='' />
                            <div className='gallery-image-info'>
                                <p>📍 {image.location} </p>
                                <p>📷 {image.camera} * {image.lens} </p>
                                <p>📦 {image.film} * {image.iso} </p>
                            </div>
                        </div>
                    ))}
                </div>

                {showImage ? <ImageModal
                    src={`${showImage}`}
                    onClose={(ev) => { setShowImage(null); ev.stopPropagation(); }}
                    next={(ev) => { handleNextClick(); ev.stopPropagation(); }}
                    prev={(ev) => { handlePrevClick(); ev.stopPropagation(); }}
                /> : null}
            </div>
        </>
    );
};

export default Gallery;
