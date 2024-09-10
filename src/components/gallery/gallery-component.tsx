import React, { useState, useEffect } from 'react';
import './gallery-style.css';
import ImageModal from './image-component';
import { apiFetchGalleryByFolderId, IPhoto } from '../../api/api-gallery';
import CameraSpinnerModal from '../camera-spinner/camera-spinner-modal.component';

interface ImageWithOrientation {
    src: string | string[];
}

interface Props {
    folderId: string;
}

const Gallery: React.FC<Props> = ({ folderId }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<IPhoto[]>([]);
    const [sortedImages, setSortedImages] = useState<ImageWithOrientation[]>([]);
    const [showImage, setShowImage] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 10_000);
        apiFetchGalleryByFolderId(folderId).then((images) => {
            setImages(images);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [folderId]);

    const handleImgClick = (src: string) => {
        console.log(`Clicked on image: ${src}`);
        setShowImage(src);
    };
    const handlePrevClick = () => {
        const flattedImages = sortedImages.flatMap(image => image.src);
        const index = flattedImages.findIndex(image => image === showImage);
        console.log(`Clicked on image: ${showImage}`);
        if (index > 0) {
            setShowImage(String(flattedImages[index - 1]));
        }
    };
    const handleNextClick = () => {
        const flattedImages = sortedImages.flatMap(image => image.src);
        const index = flattedImages.findIndex(image => image === showImage);
        if (sortedImages.length > index) {
            setShowImage(String(flattedImages.flat()[index + 1]));
        }
    };

    useEffect(() => {
        setIsLoading(true);
        const determineOrientation = (src: string): Promise<{ src: string, orientation: 'vertical' | 'horizontal'; }> => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = `${src}`;
                img.onload = () => {
                    const orientation = img.naturalWidth > img.naturalHeight ? 'horizontal' : 'vertical';
                    resolve({ src, orientation });
                };
            });
        };

        const loadAndSortImages = async () => {
            const imagePromises = images.map(({ url }) => determineOrientation(url));
            const imagesWithOrientation = await Promise.all(imagePromises);

            const horizontalImages = imagesWithOrientation.filter(image => image.orientation === 'horizontal');
            const verticalImages = imagesWithOrientation.filter(image => image.orientation === 'vertical');

            const mergedImages: ImageWithOrientation[] = [];
            let horizontalIndex = 0;
            let verticalIndex = 0;

            while (horizontalIndex < horizontalImages.length || verticalIndex < verticalImages.length) {
                if (horizontalIndex < horizontalImages.length) {
                    const pair: string[] = [];
                    pair.push(horizontalImages[horizontalIndex++].src);
                    if (horizontalIndex < horizontalImages.length) {
                        pair.push(horizontalImages[horizontalIndex++].src);
                    }
                    mergedImages.push({ src: pair });
                }
                if (verticalIndex < verticalImages.length) {
                    mergedImages.push({ src: verticalImages[verticalIndex++].src });
                }
            }

            setSortedImages(mergedImages);
        };

        loadAndSortImages().finally(() => {
            setIsLoading(false);
        });
    }, [images]);

    return (
        <>
            {showImage ? <ImageModal
                src={`${showImage}`}
                onClose={(ev) => { setShowImage(null); ev.stopPropagation(); }}
                next={(ev) => { handleNextClick(); ev.stopPropagation(); }}
                prev={(ev) => { handlePrevClick(); ev.stopPropagation(); }}
            /> : null}


            <div className="gallery-container">
                {isLoading ? <CameraSpinnerModal /> : null}
                {sortedImages.map((image, index) => (
                    <div
                        key={index}
                        className={`gallery-item ${Array.isArray(image.src) ? 'horizontal' : 'vertical'}`}
                    >
                        {Array.isArray(image.src) ? (
                            image.src.map((src, i) => (
                                <img
                                    key={i}
                                    src={`${src}`}
                                    alt=""
                                    onClick={(ev) => {
                                        handleImgClick(String(src));
                                        ev.stopPropagation();
                                    }}
                                />
                            ))
                        ) : (
                            <img
                                src={`${image.src}`}
                                alt=""
                                onClick={(ev) => {
                                    handleImgClick(String(image.src));
                                    ev.stopPropagation();
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Gallery;
