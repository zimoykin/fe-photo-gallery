
import React, { useEffect, useState } from 'react';
import './user-folders-style.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { apiDeleteFolderById, IUserFolder } from '../../../api/api-gallery';
import CameraSpinnerModal from '../../camera-spinner/camera-spinner-modal.component';

const UserFolders: React.FC = () => {

    const { folders } = useSelector((state: RootState) => state.folders) ?? [];
    const [userFolders, setUserFolders] = useState<IUserFolder[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (folders) {
            setUserFolders(folders);
        }
    }, [folders]);


    const handleFolderClick = (folderId: string) => {
        setIsLoading(true);
        apiDeleteFolderById(folderId)
            .then(() => setUserFolders(userFolders.filter(folder => folder.id !== folderId)))
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    };


    return (
        <div>
            <div className='user-folders-command-panel' >
                <i className="user-folders-icon fa-solid fa-plus" />
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
                            <i className="user-folders-icon fas fa-image" />
                            <i className="user-folders-icon fas fa-pen" />
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