
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { apiDeleteFolderById } from '../../api/api-gallery';
import CameraSpinnerModal from '../camera-spinner/camera-spinner-modal.component';
import { storeFolders } from '../../features/folders/folders-slice';
import { useNavigate } from 'react-router-dom';
import { IFoldersAndTotal, IUserFolder } from '../../interfaces/folder.interface';
import { ApiClient } from '../../api/networking/api-client';

interface Props {
    folder: IFoldersAndTotal;
}

const UserFolder: React.FC<Props> = ({ folder }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile } = useSelector((state: RootState) => state.profile);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(folder.id === '');
    const [editedFolder, setEditedFolder] = useState<IUserFolder>(folder);

    useEffect(() => {
        if (profile?.id) {
            ApiClient.get<IUserFolder[]>('/folders/' + profile.id).finally(() => setIsLoading(false))
                .then((folders) => {
                    dispatch(storeFolders(folders));
                }).catch((error) => console.log(error));
        }
    }, [profile?.id, dispatch]);


    const handleDeleteFolderClick = (folderId: string) => {
        setIsLoading(true);
        ApiClient.delete(`/folders/${folderId}`).finally(() => setIsLoading(false))
            .then(() => {
                setIsDeleted(true);
            })
            .catch((error) => console.log(error));
    };

    const handleUploadImages = () => {
        if (folder.id)
            navigate(`/settings/upload/${folder.id}`);
    };


    const handleClickSaveFolder = () => {
        if (folder.id?.length) {
            setIsLoading(true);
            ApiClient.put<IUserFolder>(`/folders/${folder.id}`, editedFolder)
                .finally(() => setIsLoading(false))
                .then(() => setEditMode(false));
        } else {
            setIsLoading(true);
            ApiClient.post<IUserFolder>('/folders', editedFolder)
                .finally(() => setIsLoading(false))
                .then(() => setEditMode(false))
                .catch((error) => console.log(error));
        }
    };
    return (
        <div>
            <div className='table-line shadow scale-s'
            >
                <div className='flex-center align-left p-10 w-70'>
                    {editMode ?
                        <div className='flex-center gap w-100 h-100'>
                            <input
                                onChange={(e) => setEditedFolder({ ...editedFolder, title: e.target.value })}
                                className='w-100 p-2 palitra-6 palitra-color-3 radius-5' type="text" defaultValue={editedFolder.title} />
                            <input
                                onChange={(e) => setEditedFolder({ ...editedFolder, description: e.target.value })}
                                className='w-100 p-2 palitra-6 palitra-color-3 radius-5' type="text" defaultValue={editedFolder.description} />
                        </div>
                        : <span>{editedFolder.title} {`(${folder.totalPhotos})`} </span>}
                </div>
                <div className='flex-cente align-right p-10 w-30'>
                    {!editMode && <i className="scale-l hover-bg p-2 fas fa-image"
                        onClick={handleUploadImages}
                    />}
                    {editMode ?
                        <div className='flex-center gap'>
                            <i className="scale-l hover-bg p-2 fas fa-save"
                                onClick={handleClickSaveFolder}
                            />
                            <i className="scale-l hover-bg p-2 fas fa-close palitra-1"
                                onClick={() => setEditMode(!editMode)}
                            />
                        </div>
                        : <i className="scale-l hover-bg p-2 fas fa-pen"
                            onClick={() => setEditMode(!editMode)}
                        />}
                    {!editMode && <i className="scale-l hover-bg p-2 fas fa-trash"
                        onClick={() => handleDeleteFolderClick(folder.id)}
                    />}
                </div>
            </div>


            {isLoading && <CameraSpinnerModal />}
        </div >
    );
};
export default UserFolder;