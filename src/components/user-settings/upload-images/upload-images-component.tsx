import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import './styles/upload-images-style.css';
import UploadImagesLine from "./upload-images-line-component";
import { apiFetchGalleryByFolderId, apiFetchUserFolderByFolderId } from "../../../api/api-gallery";
import CameraSpinnerModal from "../../camera-spinner/camera-spinner-modal.component";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { IUserFolder } from "../../../interfaces/folder.interface";
import { IPhoto } from "../../../interfaces/photo.interface";

interface IUploadImage {
    id: string;
    url: string;
    camera: string;
    lens: string;
    film: string;
    iso: string;
    description: string;
    location: string;
    file?: File;
}

const UploadImages: React.FC = () => {

    const { folderId } = useParams<{ folderId: string; }>();
    const { profile } = useSelector((state: RootState) => state.profile);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [images, setImages] = useState<IUploadImage[]>([]);
    const [folder, setFolder] = useState<IUserFolder | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (folderId && profile?.id) {
            setIsLoading(true);
            apiFetchUserFolderByFolderId(folderId)
                .then((data) => {
                    setFolder(data);
                    apiFetchGalleryByFolderId(folderId, 'preview').then((data) => {
                        setImages(data.map((image) => ({
                            id: image.id,
                            camera: image.camera ?? '',
                            film: image.film ?? '',
                            iso: image.iso ?? '',
                            lens: image.lens ?? '',
                            location: image.location ?? '',
                            description: image.description ?? '',
                            url: image.url,
                            folderId: image.folderId
                        })));
                    });
                }).finally(() => setIsLoading(false));
        }
    }, [folderId, profile?.id, profile?.equipment]);


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

    const handleAddImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ?? [];
        if (files.length > 0) {
            const imgs: IUploadImage[] = [];
            for await (const file of files) {
                const storageUrl = await loadFile(file);
                imgs.push({
                    id: '',
                    film: '',
                    iso: '',
                    camera: profile?.equipment?.find(l => l.type === 'camera' && l.favorite)?.name ?? '',
                    lens: profile?.equipment?.find(l => l.type === 'lens' && l.favorite)?.name ?? '',
                    location: '',
                    description: '',
                    url: storageUrl,
                    file: file
                });
            }
            setImages([...images, ...imgs]);
        }
    };

    const handleUpload = (photo: IPhoto, index: number) => {
        console.log('handleUpload', photo, index);
        setImages([...images.slice(0, index), {
            id: photo.id,
            camera: photo.camera ?? '',
            film: photo.film ?? '',
            iso: photo.iso ?? '',
            lens: photo.lens ?? '',
            location: photo.location ?? '',
            description: photo.description ?? '',
            url: photo.url
        }]);
    };

    return <div className="upload-images-container">
        <div className="upload-images-container-box">
            <div className="upload-images-container-folder-settings"
                style={{
                    backgroundImage: images.length > 0 ? `url(${images[Math.floor(Math.random() * images.length)]?.url})` : ''
                }}
            >
                <div>
                    <div className="highlighted-text">
                        <h1 >{folder?.title}</h1>
                    </div>
                    <div className="highlighted-text">
                        <h2>{folder?.description}</h2>
                    </div>
                    <div className="highlighted-text">
                        <h3>{folder?.bgColor}</h3>
                        <h3>{folder?.color}</h3>
                    </div>
                </div>


            </div>
            <div className="upload-images-container-box-command-panel">
                <i className="upload-images-icon fa-solid fa-plus"
                    onClick={handleAddImageClick}
                />
            </div>
            <input
                ref={fileInputRef}
                type="file"
                multiple={true}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <div className="upload-images-images-container">
                {
                    images?.map((image, index) => (
                        <UploadImagesLine
                            key={index}
                            photoId={image.id}
                            imageUrl={image.url}
                            camera={image.camera}
                            film={image.film}
                            lens={image.lens}
                            iso={image.iso}
                            location={image.location}
                            descr={image.description}
                            folderId={folderId ?? ''}
                            file={image.file}
                            sortOrder={index + 1}
                            onRemove={() => setImages(images.filter((_, i) => i !== index))}
                            onUpload={(photo) => handleUpload(photo, index)}
                        />
                    ))
                }
            </div>
        </div>;
        {isLoading && <CameraSpinnerModal />}
    </div >;
};

export default UploadImages;