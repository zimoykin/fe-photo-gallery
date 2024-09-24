import React, { useEffect, useRef, useState } from 'react';
import './styles/upload-images-style.css';
import { IPhoto, IPhotoWithImageFile } from '../../interfaces/photo.interface';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import PhotoCard from '../photo-card/photo-card';
import { ApiClient } from '../../api/networking/api-client';

interface Props {
  readonly folderId: string;
}

interface IPhotoObject extends IPhotoWithImageFile {
  name: string;
  saveAll: true | null;
  editMode: boolean;
}

const PhotosTable: React.FC<Props> = ({ folderId }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { profile } = useSelector((state: RootState) => state.profile);
  const [photos, setPhotos] = useState<Map<string, IPhotoObject>>(new Map());
  const [revision, setRevision] = useState<number>(0);

  useEffect(() => {
    setPhotos(new Map());
    ApiClient.get<IPhoto[]>(`/photos/${folderId}/preview`).then((imgs) => {
      const newPhotos = new Map();
      imgs
        .sort((a) => (a.favorite ? -1 : 0))
        .forEach((img) =>
          newPhotos.set(img.id, { ...img, name: img.id, saveAll: true, editMode: false })
        );
      setPhotos(newPhotos);
    });
  }, [folderId, revision]);

  const handleAddImageClick = () => {
    if (fileInputRef.current) fileInputRef.current?.click();
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

  function getFromLastPhoto<K extends keyof IPhotoWithImageFile>(
    propertyName: K
  ): IPhotoWithImageFile[K] | undefined {
    if (!photos) return undefined;
    if ((photos.size ?? 0) - 1 < 0) {
      return undefined;
    }
    const lastPhoto = Array.from(photos.values())[photos.size - 1];
    if (!lastPhoto) {
      return undefined;
    }
    return lastPhoto[propertyName];
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ?? [];
    if (files.length > 0) {
      const additionalPhotos = new Map(photos);
      for await (const file of files) {
        const storageUrl = await loadFile(file);
        // file.name
        additionalPhotos.set(file.name, {
          name: file.name,
          folderId: folderId,
          film: getFromLastPhoto('film') ?? '',
          iso: getFromLastPhoto('iso') ?? '',
          camera: profile?.equipment?.find((l) => l.type === 'camera' && l.favorite)?.name ?? '',
          lens: profile?.equipment?.find((l) => l.type === 'lens' && l.favorite)?.name ?? '',
          location: getFromLastPhoto('location') ?? '',
          description: getFromLastPhoto('description') ?? '',
          url: storageUrl,
          file: file,
          sortOrder: 0 + photos.size,
          saveAll: null,
          editMode: false,
          privateAccess: 0,
          profileId: profile?.id
        });
      }
      setPhotos(additionalPhotos);
    }
  };

  const handleDeleteImage = (name: string) => {
    const map = new Map(photos);
    map.delete(name);
    setPhotos(map);
  };

  return (
    <div className="flex-column scroll">
      <div className="table-command-panel pl-10">
        <div className="scale-m pointer palitra-4 hover-bg p-3">
          <i className="fa-solid fa-plus" onClick={handleAddImageClick} />
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
        {Array.from(photos).map(([name, image], index) => (
          <PhotoCard
            photo={image}
            key={index}
            showEditBtns
            profileImageUrl={profile?.url}
            needRefresh={() => {
              setRevision(revision + 1);
            }}
            removePhotoFromList={() => handleDeleteImage(name)}
          />
        ))}
      </div>
    </div>
  );
};
export default PhotosTable;
