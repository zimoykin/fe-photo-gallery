import React, { useCallback, useEffect, useState } from 'react';
import './styles/image-modal-style.css';
import ImageInfo from './image-info';
import { IPhoto } from '../../api/api-gallery';

interface Props {
    photo: IPhoto;
    isLoading: boolean;
    srcPreview: string;
    srcCompressed: string;
    isCompressedReady: boolean;
    onLoad: () => void;
    onClose: (ev: React.MouseEvent | KeyboardEvent) => void;
    next: (ev: React.MouseEvent | KeyboardEvent) => void;
    prev: (ev: React.MouseEvent | KeyboardEvent) => void;
}

const ImageModal: React.FC<Props> = ({ srcPreview, srcCompressed, isCompressedReady, onClose, next, prev, photo, isLoading, onLoad }: Props) => {
    const [showInfo, setShowInfo] = useState(false);
    const [showInfoMouseEnter, setShowInfoMouseEnter] = useState(false);

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize-screen', handleResize);
        return () => {
            window.removeEventListener('resize-screen', handleResize);
        };
    }, []);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
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
    }, [prev, next, onClose]);


    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className="image-modal-overlay">
            <div className="modal-content">
                <div className='overlay-container'>
                    <div className='overlay'>
                        {isLoading && <div className='image-vignette' >
                            <div className='image-negative'>
                                <img
                                    style={{ maxHeight: windowSize.height - 50, maxWidth: windowSize.width - 50 }}
                                    src={srcPreview} alt='' />
                            </div>
                            {(isLoading) && <div className='film-loading' />}
                        </div>}
                    </div>
                </div>
                <div className='modal-content'
                    style={{ width: isCompressedReady ? '100%' : 0, borderStyle: 'solid', borderWidth: isCompressedReady ? 10 : 0 }}
                >
                    <img
                        onLoad={onLoad}
                        style={{ maxHeight: windowSize.height - 50, maxWidth: windowSize.width - 50 }}
                        src={srcCompressed} alt='' />
                    {(showInfoMouseEnter || showInfo) && <ImageInfo photo={photo} />}
                </div>
            </div>
            <div className='commands'
            >
                <i className="fas fa-times" onClick={onClose} />
                <i className="fas fa-arrow-left" onClick={prev} />
                <i className="fas fa-arrow-right" onClick={next} />
                <i className={showInfo ? "fas fa-info-circle" : "fas fa-info"}
                    onClick={
                        () => { setShowInfo(!showInfo); }
                    }
                    onMouseEnter={() => setShowInfoMouseEnter(true)}
                    onMouseLeave={() => setShowInfoMouseEnter(false)} />
            </div>
        </div>
    );
};

export default ImageModal;