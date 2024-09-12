import React, { useState, useEffect } from 'react';
import './styles/gallery-style.css';
import './styles/gallery-table-style.css';
import ImageModal from './image-modal-component';
import { apiFetchGalleryByFolderId, apiFetchPhotoById, IPhoto } from '../../api/api-gallery';

interface Props {
    folderId: string;
}

const Gallery: React.FC<Props> = ({ folderId }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<IPhoto[]>([]);
    const [impPreview, setImgPreview] = useState<string | null>(null);
    const [imgCompressed, setImgCompressed] = useState<string | null>(null);
    const [isCompressedReady, setIsCompressedReady] = useState<boolean>(false);
    const [showFilmLoading, setShowFilmLoading] = useState(false);
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
        setIsCompressedReady(false);
        setSelectedImage(ind);
        setImgPreview(
            images[images.findIndex(image => image.id === photoId)
            ].url);
        setShowFilmLoading(true);
        const photo = await apiFetchPhotoById(folderId, photoId);
        if (photo) {
            setImgCompressed(photo.url);
        }
    };

    const handlePrevClick = async () => {
        setIsCompressedReady(false);
        const prev = selectedImage - 1;
        if (prev >= 0) {
            setSelectedImage(prev);
            setImgPreview(images[prev].url);
            setShowFilmLoading(true);
            const photo = await apiFetchPhotoById(images[prev].folderId, images[prev].id);
            if (photo) {
                setImgCompressed(photo.url);
            }
        } else {
            setSelectedImage(-1);
            setImgPreview(null);
            setImgCompressed(null);
            setShowFilmLoading(false);
        }
    };

    const handleNextClick = async () => {
        setIsCompressedReady(false);
        const next = selectedImage + 1;
        if (next >= 0 && images.length > next) {
            setSelectedImage(next);
            setImgPreview(images[next].url);
            setShowFilmLoading(true);
            const photo = await apiFetchPhotoById(images[next].folderId, images[next].id);
            if (photo) {
                setImgCompressed(photo.url);
            }
        }
        else {
            setSelectedImage(-1);
            setImgPreview(null);
            setImgCompressed(null);
            setShowFilmLoading(false);
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

                {(impPreview || imgCompressed) ? <ImageModal
                    photo={images[selectedImage]}
                    isLoading={showFilmLoading}
                    srcPreview={`${impPreview}`}
                    isCompressedReady={isCompressedReady}
                    srcCompressed={`${imgCompressed}`}
                    onLoad={() => {
                        console.log('onLoad');
                        setIsCompressedReady(true);
                        setShowFilmLoading(false);
                    }}
                    onClose={(ev) => { setImgCompressed(null); setImgPreview(null); ev.stopPropagation(); }}
                    next={(ev) => { handleNextClick(); ev.stopPropagation(); }}
                    prev={(ev) => { handlePrevClick(); ev.stopPropagation(); }}
                /> : null}
            </div>
        </>
    );
};

export default Gallery;
