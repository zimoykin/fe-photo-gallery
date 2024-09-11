import React, { useEffect, useState } from 'react';
import './image-modal-style.css';
import ImageOverlays from './image-overlays';
import { IPhoto } from '../../api/api-gallery';

interface Props {
    photo: IPhoto;
    src: string;
    onClose: (ev: React.MouseEvent | KeyboardEvent) => void;
    next: (ev: React.MouseEvent | KeyboardEvent) => void;
    prev: (ev: React.MouseEvent | KeyboardEvent) => void;
}

const ImageModal: React.FC<Props> = ({ src, onClose, next, prev, photo }: Props) => {


    const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowLeft':
                prev(event);
                break;
            case 'ArrowRight':
                next(event);
                break;
            case 'Escape':
                onClose(event);
                break;
            default:
                break;
        }
    };


    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const [showOverlays, setShowOverlays] = useState(false);
    const handleOnMouseEnter = (ev: React.MouseEvent) => {
        setShowOverlays(true);
    };

    return (
        <div className="image-modal-overlay" onClick={onClose}>
            <div className="modal-content">
                <div className='overlay-container'>
                    <div className='overlay' onClick={() => setShowOverlays(!showOverlays)}>
                        <img
                            style={{ maxHeight: window.innerHeight - 100, maxWidth: window.innerWidth - 100 }}
                            src={src} alt='' />
                    </div>
                    {showOverlays && <ImageOverlays photo={photo} />}
                </div>
                <div className='commands'
                >
                    <i className="fas fa-times" onClick={onClose} />
                    <i className="fas fa-arrow-left" onClick={prev} />
                    <i className="fas fa-arrow-right" onClick={next} />
                    <i className="fas fa-info-circle overlay-icon"
                        onMouseEnter={handleOnMouseEnter}
                        onMouseLeave={() => setShowOverlays(false)} />
                </div>
            </div>
        </div>
    );
};

export default ImageModal;