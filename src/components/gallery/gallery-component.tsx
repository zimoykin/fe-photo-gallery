import React, { useState, useEffect } from 'react';
import './gallery-style.css';
import ImageModal from './image-component';

const photos = [
    'Frame-23-08-2024-11-47-12.jpeg',
    'Frame-24-08-2024-09-48-05.jpeg',
    'Frame-24-08-2024-10-12-21.jpeg',
    'Frame-24-08-2024-10-18-07.jpeg',
    'Frame-25-08-2024-03-08-23.jpeg',
    'Frame-25-08-2024-03-10-37.jpeg',
    'IMG_5062.jpeg',
    'IMG_5152.jpeg',
    'IMG_6099.jpeg',
    'IMG_9299.jpeg',
    'Frame-25-08-2024-03-19-53.jpeg',
    'Frame-25-08-2024-03-15-03.jpeg',
    'Frame-25-08-2024-03-17-46.jpeg',
    'Frame-25-08-2024-03-20-22.jpeg'
] as const;
const imgMockFolder = 'hardcoded-images';
interface ImageWithOrientation {
    src: string | string[];
}

const Gallery: React.FC = () => {
    const [sortedImages, setSortedImages] = useState<ImageWithOrientation[]>([]);
    const [showImage, setShowImage] = useState<string | null>(null);

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
        const determineOrientation = (src: string): Promise<{ src: string, orientation: 'vertical' | 'horizontal'; }> => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = `/${imgMockFolder}/${src}`;
                img.onload = () => {
                    const orientation = img.naturalWidth > img.naturalHeight ? 'horizontal' : 'vertical';
                    resolve({ src, orientation });
                };
            });
        };

        const loadAndSortImages = async () => {
            const imagePromises = photos.map(determineOrientation);
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

        loadAndSortImages();
    }, []);

    return (
        <>
            {showImage ? <ImageModal
                src={`/${imgMockFolder}/${showImage}`}
                onClose={(ev) => { setShowImage(null); ev.stopPropagation(); }}
                next={(ev) => { handleNextClick(); ev.stopPropagation(); }}
                prev={(ev) => { handlePrevClick(); ev.stopPropagation(); }}
            /> : null}

            <div className="gallery-container">
                {sortedImages.map((image, index) => (
                    <div
                        key={index}
                        className={`gallery-item ${Array.isArray(image.src) ? 'horizontal' : 'vertical'}`}
                    >
                        {Array.isArray(image.src) ? (
                            image.src.map((src, i) => (
                                <img
                                    key={i}
                                    src={`/${imgMockFolder}/${src}`}
                                    alt=""
                                    onClick={(ev) => {
                                        handleImgClick(String(src));
                                        ev.stopPropagation();
                                    }}
                                />
                            ))
                        ) : (
                            <img
                                src={`/${imgMockFolder}/${image.src}`}
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
