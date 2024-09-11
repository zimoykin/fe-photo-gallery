import React, { useState, useEffect } from 'react';
import './gallery-style.css';
import './gallery-table-style.css';
import ImageModal from './image-component';
import { apiFetchGalleryByFolderId, apiFetchPhotoById, IPhoto } from '../../api/api-gallery';

interface Props {
    folderId: string;
}

const Gallery: React.FC<Props> = ({ folderId }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<IPhoto[]>([]);
    const [showImage, setShowImage] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState(-1);

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

    const handleImgClick = async (folderId: string, photoId: string, ind: number) => {
        setSelectedImage(ind);
        setShowImage(
            images[images.findIndex(image => image.id === photoId)
            ].url);
        const photo = await apiFetchPhotoById(folderId, photoId);
        if (photo) {
            setShowImage(photo.url);
        }
    };

    const handlePrevClick = async () => {
        const prev = selectedImage - 1;
        if (prev >= 0) {
            setSelectedImage(prev);
            setShowImage(images[prev].url);
            const photo = await apiFetchPhotoById(images[prev].folderId, images[prev].id);
            if (photo) {
                setShowImage(photo.url);
            }
        }
    };

    const handleNextClick = async () => {
        console.log(selectedImage);
        const next = selectedImage + 1;
        if (next >= 0 && images.length > next) {
            setSelectedImage(next);
            setShowImage(images[next].url);
            const photo = await apiFetchPhotoById(images[next].folderId, images[next].id);
            if (photo) {
                setShowImage(photo.url);
            }
        }
    };

    return (
        <>
            <div className="gallery-container"
                onClick={(ev) => { ev.stopPropagation(); }}
            >
                {isLoading && <div className="gallery-image-card"><div className='gallery-image-loading'>  </div></div>}

                <div className="gallery-row">
                    {images.map((image, index) => (
                        <div
                            key={index} className='gallery-image-card'
                            onClick={() => image?.id && handleImgClick(image.folderId!, image.id, index)}>
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
                    photo={images[selectedImage]}
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
