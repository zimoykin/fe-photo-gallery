import React, { useCallback, useState } from 'react';
import './photo-card-style.css';
import { IPhoto, IPhotoWithImageFile } from '../../interfaces/photo.interface';
import { ApiClient } from '../../api/networking/api-client';
import CameraSpinner from '../camera-spinner/camera-spinner.component';
import Avatar from '../avatar/avatar-component';

interface Props {
  photo: IPhotoWithImageFile;
  profileImageUrl?: string;
  showEditBtns?: true;
  needRefresh?: () => void;
  removePhotoFromList?: () => void;
}

const PhotoCard: React.FC<Props> = ({
  photo,
  showEditBtns,
  needRefresh,
  removePhotoFromList,
  profileImageUrl
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(photo.id ? false : true);
  const [editInfo, setEditInfo] = useState<IPhotoWithImageFile>(photo);

  const handleUpdatingInfo = (property: keyof IPhotoWithImageFile, value: string | number) => {
    setEditInfo({ ...editInfo, [property]: value });
  };

  const uploadFile = useCallback(() => {
    if (!editInfo.folderId) throw new Error('Folder id is required');
    if (!editInfo.file) throw new Error('File is required');

    const formData = new FormData();
    formData.append('file', editInfo.file);
    formData.append('camera', editInfo.camera ?? '');
    formData.append('lens', editInfo.lens ?? '');
    formData.append('location', editInfo.location ?? '');
    formData.append('description', editInfo.description ?? '');
    formData.append('film', editInfo.film ?? '');
    formData.append('iso', editInfo.iso ?? '');
    formData.append('profileId', editInfo.profileId ?? '');
    formData.append('folderId', editInfo.folderId);
    formData.append('favorite', editInfo.favorite?.toString() ?? String(false));
    formData.append('sortOrder', editInfo.sortOrder?.toString() ?? '0');
    formData.append('privateAccess', editInfo.privateAccess?.toString() ?? '0');
    return ApiClient.postUpload<IPhoto>(`/photos/${editInfo.folderId}`, formData);
  }, [editInfo]);

  const handleFavoriteClick = () => {
    if (editInfo.folderId && editInfo.id) {
      setIsLoading(true);
      ApiClient.put<IPhoto>(`/photos/${editInfo.folderId}/${editInfo.id}`, {
        ...editInfo,
        favorite: !editInfo.favorite
      })
        .finally(() => setIsLoading(false))
        .then((data) => {
          setEditInfo(data);
          if (needRefresh) needRefresh();
        })
        .catch(console.log);
    }
  };

  const handleDeleteClick = () => {
    if (photo.id) {
      setIsLoading(true);
      ApiClient.delete<IPhoto>(`/photos/${photo.folderId}/${photo.id}`)
        .finally(() => setIsLoading(false))
        .then(() => (needRefresh ? needRefresh() : null))
        .catch(console.error);
    } else {
      if (removePhotoFromList) removePhotoFromList();
    }
  };

  const handleSaveClick = () => {
    if (photo.id) {
      setIsLoading(true);
      ApiClient.put<IPhoto>(`/photos/${photo.folderId}/${photo.id}`, {
        ...editInfo,
        file: null
      })
        .finally(() => setIsLoading(false))
        .then((data) => {
          photo.id = data.id;
          editInfo.id = data.id;
          setIsEditMode(false);
        });
    } else if (photo.folderId) {
      if (photo.file) {
        setIsLoading(true);
        uploadFile()
          .finally(() => {
            setIsEditMode(false);
            setIsLoading(false);
          })
          .then((data) => {
            setEditInfo(data);
            setIsEditMode(false);
          });
      }
    }
  };

  return (
    <>
      <div
        className={`scale-s photo-card-container flex-center flex-column p-3 shadow ${photo.id ? '' : 'photo-card-new-element'}`}
      >
        {isLoading ? (
          <CameraSpinner />
        ) : (
          <>
            {' '}
            <div
              className="photo-card-img no-repeat radius-5"
              style={{
                backgroundImage: `url(${photo.url})`
              }}
            />
            <div className="photo-card-btns flex-row flex-center w-100">
              {showEditBtns && (
                <div className="flex-row p-10 w-100 ">
                  {/* left */}
                  <div className="w-50 flex-row align-left ">
                    <div className="p-3 scale-l hover-bg" onClick={handleFavoriteClick}>
                      <span className="photo-card-description">
                        {photo.id && (
                          <i
                            className="fas fa-star"
                            style={{
                              fontSize: '1.5rem',
                              color: `${editInfo.favorite === true ? 'gold' : 'gray'}`
                            }}
                          />
                        )}
                      </span>
                    </div>
                  </div>

                  {/* right */}
                  <div className="w-50 flex-row align-right">
                    <div className="hover-bg p-3">
                      <span className="photo-card-description">
                        {!isEditMode && (
                          <i
                            onClick={() => setIsEditMode(true)}
                            style={{ fontSize: '1.5rem' }}
                            className="fas fa-pen"
                          />
                        )}
                        {isEditMode && (
                          <i
                            onClick={handleSaveClick}
                            style={{ fontSize: '1.5rem' }}
                            className="fas fa-save"
                          />
                        )}
                      </span>
                    </div>
                    <div className="pl-10 hover-bg p-3" onClick={handleDeleteClick}>
                      <span className="photo-card-description">
                        <i
                          className="fas fa-trash"
                          style={{
                            color: `tomato`,
                            fontSize: '1.5rem'
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-row w-100 ">
              <div className="flex-column w-90 pt-10">
                <div className="">
                  {!isEditMode ? (
                    <span className="photo-card-description">{photo.camera}</span>
                  ) : (
                    <input
                      value={editInfo.camera}
                      onChange={(e) => handleUpdatingInfo('camera', e.target.value)}
                      className="w-100 palitra-4 p-2"
                    />
                  )}
                </div>
                <div className="">
                  {!isEditMode ? (
                    <span className="photo-card-description">{photo.lens}</span>
                  ) : (
                    <input
                      value={editInfo.lens}
                      onChange={(e) => handleUpdatingInfo('lens', e.target.value)}
                      className="w-100 palitra-4 p-1"
                    />
                  )}
                </div>
                <div className="">
                  {!isEditMode ? (
                    <span className="photo-card-description">
                      {photo.location || 'no location'}
                    </span>
                  ) : (
                    <input
                      value={editInfo.location}
                      onChange={(e) => handleUpdatingInfo('location', e.target.value)}
                      className="w-100 palitra-4 p-1"
                    />
                  )}
                </div>

                <div className="">
                  {!isEditMode ? (
                    <span className="photo-card-description">{photo.film || ''}</span>
                  ) : (
                    <input
                      placeholder="film"
                      value={editInfo.film}
                      onChange={(e) => handleUpdatingInfo('film', e.target.value)}
                      className="w-100 palitra-4 p-1"
                    />
                  )}
                </div>

                <div className="">
                  {!isEditMode ? (
                    <span className="photo-card-description">
                      {(editInfo.privateAccess ?? 0) > 0 ? 'private' : 'public'}
                    </span>
                  ) : (
                    <select
                      defaultValue={0}
                      value={editInfo.privateAccess}
                      onChange={(e) => handleUpdatingInfo('privateAccess', Number(e.target.value))}
                      className="w-100 palitra-4 p-1"
                    >
                      <option value={0}>Public</option>
                      <option value={1}>Private</option>
                    </select>
                  )}
                </div>
              </div>

              <div className="flex-center w-20 p-5">
                <Avatar size="mini" url={profileImageUrl} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PhotoCard;
