import React, { useState, useEffect } from 'react';
import './galery-style.css';

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

interface ImageWithOrientation {
    src: string | string[];
}

interface Props {
    onImgClick: (src: string, event: React.MouseEvent) => void;
}

const Gallery: React.FC<Props> = ({ onImgClick }: Props) => {
    const [sortedImages, setSortedImages] = useState<ImageWithOrientation[]>([]);

    useEffect(() => {
        const determineOrientation = (src: string): Promise<{ src: string, orientation: 'vertical' | 'horizontal'; }> => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = `/hardcoded-images/${src}`; // Укажите правильный путь к изображению
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

            // Чередуем 2 горизонтальных в массив и 1 вертикальное изображение
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
                                src={`/hardcoded-images/${src}`} // Укажите правильный путь к изображению
                                alt={src}
                                onClick={(ev) => onImgClick(src, ev)}
                            />
                        ))
                    ) : (
                        <img
                            src={`/hardcoded-images/${image.src}`} // Укажите правильный путь к изображению
                            alt={image.src}
                            onClick={(ev) => onImgClick(String(image.src), ev)}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Gallery;
