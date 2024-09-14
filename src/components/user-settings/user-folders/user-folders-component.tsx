
import React, { useEffect, useState } from 'react';
import './user-folders-style.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { apiDeleteFolderById, apiFetchUserFolders, IUserFolder } from '../../../api/api-gallery';
import CameraSpinnerModal from '../../camera-spinner/camera-spinner-modal.component';
// import FolderCreateUpdate from '../folder-create-update/folder-create-update-component';
import { storeFolders } from '../../../features/folders/folders-slice';
import { useNavigate } from 'react-router-dom';

interface Props {
    folders: IUserFolder[];
    handleClickCreateFolder: () => void;
    handleClickEditFolder: (index: number) => void;
}

const UserFolders: React.FC<Props> = ({ folders, handleClickCreateFolder, handleClickEditFolder }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.profile);

    const [userFolders, setUserFolders] = useState<IUserFolder[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (folders) {
            setUserFolders(folders);
        }
    }, [folders]);

    useEffect(() => {
        if (user?.id) {
            apiFetchUserFolders(user.id)
                .then((folders) => {
                    dispatch(storeFolders(folders));
                });
        }

    }, [user, dispatch]);


    const handleFolderClick = (folderId: string) => {
        setIsLoading(true);
        apiDeleteFolderById(folderId)
            .then(() => setUserFolders(userFolders.filter(folder => folder.id !== folderId)))
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    };

    const hnadleUploadImages = (folderId: string) => {
        navigate(`/settings/upload/${folderId}`);
    };

    return (
        <div>
            <div className='user-folders-command-panel' >
                <i className="user-folders-icon fa-solid fa-plus"
                    onClick={handleClickCreateFolder} />
                {/* <i className="user-folders-icon fas fa-image" /> */}
            </div>
            <div className='user-folders-table'>
                {userFolders.map((folder, index) => (
                    <div className='user-folders-folder-line'
                        key={index}
                    >
                        <div className='user-folders-folder-title'>
                            <h3>{folder.title}</h3>
                        </div>
                        <div className='user-folders-folder-comannd'>
                            <i className="user-folders-icon fas fa-image"
                                onClick={() => hnadleUploadImages(folder.id)}
                            />
                            <i className="user-folders-icon fas fa-pen"
                                onClick={() => handleClickEditFolder(index)}
                            />
                            <i className="user-folders-icon fas fa-trash"
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