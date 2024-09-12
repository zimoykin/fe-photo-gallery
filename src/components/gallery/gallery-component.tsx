import React, { useState, useEffect, useCallback } from 'react';
import './styles/gallery-style.css';
import './styles/gallery-table-style.css';
import ImageModal from './image-modal-component';
import { apiFetchGalleryByFolderId, apiFetchPhotoById, IPhoto } from '../../api/api-gallery';
import { useSearchParams } from 'react-router-dom';

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
    const [searchParams, setSearchParams] = useSearchParams();

    const updateQuery = useCallback(async (params: Record<string, string>) => {
        const currentParams = Object.fromEntries(searchParams.entries());
        setSearchParams({ ...currentParams, ...params });
    }, [searchParams, setSearchParams]);

    const removeQueryParam = useCallback((param: string) => {
        const currentParams = Object.fromEntries(searchParams.entries());
        delete currentParams[param];
        setSearchParams({ ...currentParams });
    }, [searchParams, setSearchParams]);

    const handlePickingPhoto = useCallback(async (id: string, ind: number) => {
        updateQuery({ photoId: id });
        setSelectedImage(ind);
        const photo = images.find(image => image.id === id);
        if (photo && folderId) {
            setImgPreview(photo.url);
            setShowFilmLoading(true);
            const photoCompressed = await apiFetchPhotoById(folderId, id);
            if (photoCompressed) {
                setImgCompressed(photoCompressed.url);
            }
        }
    }, [folderId, images, updateQuery]);

    useEffect(() => {
        const photo = images.find(image => image.id === searchParams.get('photoId'));
        const index = images.findIndex(image => image.id === searchParams.get('photoId'));
        if (photo) {
            handlePickingPhoto(photo.id, index);
        }
    }, [images, searchParams, handlePickingPhoto]);

    useEffect(() => {
        setIsLoading(true);
        apiFetchGalleryByFolderId(folderId, 'preview').then((images) => {
            setImages(images);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [folderId]);

    const handleImgClick = async (folderId: string, photoId: string, ind: number) => {
        handlePickingPhoto(photoId, ind);
    };

    const handlePrevClick = async () => {
        setIsCompressedReady(false);
        const prev = selectedImage - 1;
        if (prev >= 0) {
            handlePickingPhoto(images[prev].id, prev);
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
            handlePickingPhoto(images[next].id, next);
        } else {
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
                        setIsCompressedReady(true);
                        setShowFilmLoading(false);
                    }}
                    onClose={(ev) => {
                        setSelectedImage(-1);
                        setImgCompressed(null);
                        setImgPreview(null);
                        removeQueryParam('photoId');
                        ev.stopPropagation();
                    }}
                    next={(ev) => { handleNextClick(); ev.stopPropagation(); }}
                    prev={(ev) => { handlePrevClick(); ev.stopPropagation(); }}
                /> : null}
            </div>
        </>
    );
};

export default Gallery;
