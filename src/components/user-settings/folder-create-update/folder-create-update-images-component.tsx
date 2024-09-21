import React, { useEffect, useState } from 'react';
import './styles/folder-create-update-images-style.css';
import CameraSpinnerModal from '../../camera-spinner/camera-spinner-modal.component';
import { IPhoto } from '../../../interfaces/photo.interface';
import { ApiClient } from '../../../api/networking/api-client';

interface Props {
    folderId?: string;
}

const FolderCreateUpdateImages: React.FC<Props> = ({ folderId }) => {

    const [images, setImages] = useState<IPhoto[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cardHovered, setCardHovered] = useState<number>(-1);

    useEffect(() => {
        if (folderId) {
            setIsLoading(true);
            ApiClient.get<IPhoto[]>(`/photos/${folderId}/preview`)
                .finally(() => setIsLoading(false))
                .then((photos) => setImages(photos))
                .catch((error) => console.log(error));
        }

    }, [folderId]);

    const handleDeleteClick = (folderId: string, photoId: string) => {
        setIsLoading(true);
        ApiClient.delete(`/photos/${folderId}/${photoId}`)
            .finally(() => setIsLoading(false))
            .then(() => {
                setImages(images.filter(image => image.id !== photoId));
            })
            .catch((error) => console.log(error));
    };

    const handleCardMouseEnter = (index: number) => {
        setCardHovered(index);
    };
    const handleCardMouseLeave = () => {
        setCardHovered(-1);
    };

    return (
        <div>
            {!isLoading && <div className='folder-create-update-images-container'>
                {images?.length > 0 && images.map((image, index) => (
                    <div key={image.id} className='folder-create-update-images-container-card'
                        onMouseEnter={() => handleCardMouseEnter(index)}
                        onMouseLeave={() => handleCardMouseLeave()}
                    >
                        <div className='folder-create-update-images-container-card-wrapper'>
                            <img key={image.id} src={image.url} alt={image.id} />
                            {
                                cardHovered === index &&
                                <div className='folder-create-update-images-container-card-overlay'>
                                    <i className="fas fa-trash"
                                        onClick={() => handleDeleteClick(image.folderId, image.id)}
                                    />
                                    <i className="fas fa-edit" />
                                </div>}
                        </div>
                        <div className='folder-create-update-images-container-card-photo-info'>
                            <p>{image.camera}</p>
                            <p>{`${image.lens}`}</p>
                            <p>{`film: ${image.film}`}</p>
                        </div>
                    </div>
                ))}
                {images?.length === 0 && <p>No photos in folder</p>}
            </div>}
            {isLoading ? <CameraSpinnerModal /> : null}
        </div>
    );
};


export default FolderCreateUpdateImages;