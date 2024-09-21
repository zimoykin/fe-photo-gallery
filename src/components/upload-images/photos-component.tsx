import React, { useCallback, useEffect, useRef, useState } from "react";
import './styles/upload-images-style.css';
import { IPhoto, IPhotoWithImageFile } from "../../interfaces/photo.interface";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import PhotoCard from "../photo-card/photo-card";
import { ApiClient } from "../../api/networking/api-client";

interface Props {
    readonly folderId: string;
}

const PhotosTable: React.FC<Props> = ({ folderId }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { profile } = useSelector((state: RootState) => state.profile);
    const [photos, setPhotos] = useState<IPhotoWithImageFile[]>([]);
    const [newPhotos, setNewPhotos] = useState<IPhotoWithImageFile[]>([]);

    const fetchPhotos = useCallback(async (): Promise<IPhoto[]> => {
        return await ApiClient.get<IPhoto[]>(`/photos/${folderId}/preview`);
    }, [folderId]);

    useEffect(() => {
        fetchPhotos().then(imgs => setPhotos(imgs));
    }, [folderId, fetchPhotos]);

    const handleAddImageClick = () => {
        if (fileInputRef.current)
            fileInputRef.current?.click();
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

    function getFromLastPhoto<K extends keyof IPhotoWithImageFile>(propertyName: K): IPhotoWithImageFile[K] | undefined {
        if (!photos)
            return undefined;
        if (((photos.length ?? 0) - 1) < 0) {
            return undefined;
        }
        const lastPhoto = photos[(photos.length ?? 0) - 1];
        if (!lastPhoto) {
            return undefined;
        } return lastPhoto[propertyName];
    };


    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ?? [];
        if (files.length > 0) {
            const imgs: IPhotoWithImageFile[] = [];
            for await (const file of files) {
                const storageUrl = await loadFile(file);
                imgs.push({
                    folderId: folderId,
                    film: getFromLastPhoto('film') ?? '',
                    iso: getFromLastPhoto('iso') ?? '',
                    camera: profile?.equipment?.find(l => l.type === 'camera' && l.favorite)?.name ?? '',
                    lens: profile?.equipment?.find(l => l.type === 'lens' && l.favorite)?.name ?? '',
                    location: getFromLastPhoto('location') ?? '',
                    description: getFromLastPhoto('description') ?? '',
                    url: storageUrl,
                    file: file,
                    sortOrder: (photos.length + newPhotos.length)
                });
            }
            setNewPhotos([...newPhotos ?? [], ...imgs]);
        }
    };

    const handleDeleteImage = (index: number) => {
        if (index > -1) {
            setNewPhotos((prevPhotos) =>
                prevPhotos.filter((_, i) => i !== index)
            );
        }
    };


    return <>

        <div className="table-command-panel pl-10">
            <div className="scale-m pointer palitra-4 hover-bg p-3">
                <i className="fa-solid fa-plus"
                    onClick={handleAddImageClick}
                />
            </div>
        </div>

        <input
            ref={fileInputRef}
            type="file"
            multiple={true}
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
        />

        <div className="photos-table w-100 pt-10 pl-10 pr-10 gap">
            {
                [...photos]?.map((image, index) => (
                    <PhotoCard
                        photo={image}
                        key={index}
                        showEditBtns
                        needRefresh={() => fetchPhotos().then(imgs => setPhotos(imgs))}
                    />

                ))
            } {
                newPhotos.map((image, index) => (
                    <PhotoCard
                        photo={image}
                        key={index}
                        showEditBtns
                        removePhotoFromList={() => handleDeleteImage(index)}
                        needRefresh={() => fetchPhotos().then(imgs => setPhotos(imgs))}
                    />

                ))
            }
        </div>
    </>;
};
export default PhotosTable;
