import React, { useState } from "react";
import "./styles/upload-photo-style.css";
import { apiUploadPhoto } from "../../api/api-gallery";
import CameraSpinnerModal from "../camera-spinner/camera-spinner-modal.component";

interface Props {
    folderId: string,
    onClose: () => void;
}


const UploadPhotoModal: React.FC<Props> = ({ folderId, onClose }: Props) => {
    const [images, setImages] = useState<{ src: string, name: string; file: File; }[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [camera, setCamera] = useState('Canon EOS 650');
    const [film, setFilm] = useState('Kodak ultra mx 400');
    const [lens, setLens] = useState('Sigma 50mm f/1.4');
    const [iso, setIso] = useState(400);
    const [location, setLocation] = useState('TOKYO, JP');

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleUpload = () => {
        setIsLoading(true);
        images.map(async image => {
            const formData = new FormData();
            formData.append('file', image.file);
            formData.append('camera', camera);
            formData.append('film', film);
            formData.append('lens', lens);
            formData.append('iso', iso.toString());
            formData.append('location', location);

            return apiUploadPhoto(formData, folderId).finally(() => {
                setIsLoading(false);
                onClose();
            });
        });
    };

    const loadFile = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };
    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const imgs: { src: string, name: string; file: File; }[] = [];
            for await (const file of files) {
                const storageUrl = await loadFile(file);
                imgs.push({ src: storageUrl, name: file.name, file: file });
            }
            setImages([...images, ...imgs]);
        }
    };
    return (
        <div
            className="upload-photo-modal"
            onClick={onClose}>

            <div className="upload-photo-container"
                onClick={(e) => e.stopPropagation()}>
                <div
                    className="upload-photo-drag-area"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {!images.length && <h1>Drag and drop your photo here</h1>}
                    {images.length && <div className="uploaded-photos-container">
                        {images.map(({ src: image }, index) => (
                            <img key={index} src={image} alt={`Uploaded ${index}`} className="uploaded-image" />
                        ))}
                    </div>}
                </div>
                <div className="upload-photo-info">
                    <input type="text" placeholder="Camera" value={camera} onChange={(e) => setCamera(e.target.value)} />
                    <input type="text" placeholder="Film" value={film} onChange={(e) => setFilm(e.target.value)} />
                    <input type="text" placeholder="Lens" value={lens} onChange={(e) => setLens(e.target.value)} />
                    <input type="number" placeholder="ISO" value={iso} onChange={(e) => setIso(parseInt(e.target.value))} />
                    <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    <button onClick={handleUpload}>Upload</button>
                </div>

            </div>
            {isLoading && <CameraSpinnerModal />}
        </div>
    );
};

export default UploadPhotoModal;