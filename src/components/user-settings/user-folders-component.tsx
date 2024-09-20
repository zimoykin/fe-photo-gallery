
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { apiDeleteFolderById, apiFetchUserFolders, } from '../../api/api-gallery';
import CameraSpinnerModal from '../camera-spinner/camera-spinner-modal.component';
import { storeFolders } from '../../features/folders/folders-slice';
import { useNavigate } from 'react-router-dom';
import { IFoldersAndTotal } from '../../interfaces/folder.interface';

interface Props {
    folders: IFoldersAndTotal[];
    handleClickCreateFolder: () => void;
    handleClickEditFolder: (index: number) => void;
}

const UserFolders: React.FC<Props> = ({ folders, handleClickCreateFolder, handleClickEditFolder }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile } = useSelector((state: RootState) => state.profile);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (profile?.id) {
            apiFetchUserFolders(profile.id)
                .then((folders) => {
                    dispatch(storeFolders(folders));
                });
        }

    }, [profile?.id, dispatch]);


    const handleFolderClick = (folderId: string) => {
        setIsLoading(true);
        apiDeleteFolderById(folderId)
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    };

    const hnadleUploadImages = (folderId: string) => {
        navigate(`/settings/upload/${folderId}`);
    };

    return (
        <div>
            <div className='table-command-panel' >
                <i className="fa-solid fa-plus hover-bg scale-l"
                    onClick={handleClickCreateFolder} />
                {/* <i className="user-folders-icon fas fa-image" /> */}
            </div>
            <div className='table'>
                {[...folders]?.map((folder, index) => (
                    <div className='table-line shadow scale-s'
                        key={index}
                    >
                        <div className='flex-center align-left p-10 w-70'>
                            <span>{folder.title} {`(${folder.totalPhotos})`} </span>
                        </div>
                        <div className='flex-cente align-right p-10 w-30'>
                            <i className="scale-l hover-bg p-2 fas fa-image"
                                onClick={() => hnadleUploadImages(folder.id)}
                            />
                            <i className="scale-l hover-bg p-2 fas fa-pen"
                                onClick={() => handleClickEditFolder(index)}
                            />
                            <i className="scale-l hover-bg p-2 fas fa-trash"
                                onClick={() => handleFolderClick(folder.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            {isLoading && <CameraSpinnerModal />}
        </div>
    );
};
export default UserFolders;