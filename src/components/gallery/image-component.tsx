import React from 'react';
import './gallery-style.css';

interface Props {
    src: string;
    onClose: (ev: React.MouseEvent) => void;
    next: (ev: React.MouseEvent) => void;
    prev: (ev: React.MouseEvent) => void;
}

const ImageModal: React.FC<Props> = ({ src, onClose, next, prev }: Props) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content">
                <img src={src} alt=''/>
                <div className='commands'>

                    <i className="fas fa-times" onClick={onClose} />
                    <i className="fas fa-arrow-left" onClick={prev} />
                    <i className="fas fa-arrow-right" onClick={next} />
                </div>
            </div>
        </div>
    );
};

export default ImageModal;