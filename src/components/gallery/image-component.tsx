import './gallery-style.css';

interface Props {
    src: string;
    onClose: (ev: any) => void;
    next: (ev: any) => void;
    prev: (ev: any) => void;
}

const ImageModal: React.FC<Props> = ({ src, onClose, next, prev }: Props) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content">
                <img src={src} />
                <div className='commands'>

                    <i className="fas fa-times" onClick={onClose} />
                    <i className="fas fa-arrow-left" onClick={prev} />
                    <i className="fas fa-arrow-right" onClick={next} />
                    {/* <button className="icon-button prev-button" onClick={prev}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <button className="icon-button next-button" onClick={next}>
                        <i className="fas fa-arrow-right"></i>
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default ImageModal;