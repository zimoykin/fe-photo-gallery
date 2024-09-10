import React, { useEffect, useState } from 'react';
import './user-settings-style.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { apiDeleteFolderById, apiFetchUserFolders, IUserFolder } from '../../api/api-gallery';
import FolderView from '../folder/folder-view-component';
import CameraSpinnerModal from '../camera-spinner/camera-spinner-modal.component';
import UploadPhotoModal from '../gallery/upload-photo-model';

const UserSettings: React.FC = () => {

    const foldersStore = useSelector((state: RootState) => state.folders);
    const [folders, setFolders] = useState<IUserFolder[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModalFolderView, setShowModalFolderView] = useState(false);
    const [showUploadImg, setShowUploadImg] = useState(false);
    const [dragFolder, setDragFolder] = useState<[number, number] | null>(null);
    const [selectedFolder, setSelectedFolder] = useState(-1);

    useEffect(() => {
        setFolders([...foldersStore.folders].sort((a, b) => {
            return a.sortOrder - b.sortOrder;
        }));
    }, [foldersStore]);

    const handleSelectedFolder = (ind: number) => {
        if (selectedFolder === ind) {
            setSelectedFolder(-1);
        } else {
            setSelectedFolder(ind);
        }
    };

    const updateFolderStore = () => {
        setIsLoading(true);
        apiFetchUserFolders()
            .then(folders => {
                setFolders([...folders]);
            }).finally(() => {
                setIsLoading(false);
            });
    };

    const folderViewOnClose = () => {
        setShowModalFolderView(false);
        updateFolderStore();
    };

    const handleDeleteFolder = () => {
        if (selectedFolder >= 0) {
            apiDeleteFolderById(folders[selectedFolder].id).then(() => {
                setFolders([...folders.filter((f, i) => i !== selectedFolder)]);
                setSelectedFolder(-1);
            }).catch(e => console.log(e));
        }
    };

    const handleDragEnd = (e: React.DragEvent, ind: number) => {
        console.log(dragFolder, ind);
    };
    const handleDragStart = (e: React.DragEvent, ind: number) => {
        console.log(ind, e.detail);
        setDragFolder([ind, 0]);
    };

    const handleDragOver = (e: React.DragEvent, ind: number) => {
        setDragFolder([ind, (dragFolder?.[1] ?? 0) + 1]);
    };

    const handleUploadPhotoClick = () => {
        setShowUploadImg(true);
    };

    return (
        <>
            <div id='user-settings-container'>
                <div className='command-panel'>
                    <div className='icon'>
                        <i className="fas fa-plus" onClick={() => { setSelectedFolder(-1); setShowModalFolderView(true); }} />
                    </div>
                    {selectedFolder >= 0 ? <div className='icon'>
                        <i className="fas fa-minus" onClick={handleDeleteFolder} />
                    </div>
                        : null}
                    {selectedFolder >= 0 ? <div className='icon'>
                        <i className="fas fa-edit" onClick={() => setShowModalFolderView(true)} />
                    </div> : null}
                    {selectedFolder >= 0 ? <div className='icon'> <i className="fas fa-camera" onClick={handleUploadPhotoClick} /> </div> : null}

                </div>
                <div className='user-settings-page'>
                    <table>
                        <thead>
                            <tr>
                                <th>FOLDERS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                folders.map((folder, ind) => <tr

                                    draggable
                                    onDragStart={(e) => handleDragStart(e, ind)}
                                    onDragOver={(e) => handleDragOver(e, ind)}
                                    onDragEnd={(e) => handleDragEnd(e, ind)}

                                    onClick={() => handleSelectedFolder(ind)}
                                    className={selectedFolder === ind ? 'table-line folder-selected' : 'table-line'}
                                    key={folder.id} >
                                    <td style={{ width: '10%', backgroundColor: folder.bgColor }}></td>
                                    <td style={{ width: '10%', backgroundColor: folder.color }}></td>
                                    <td style={{}}> {folder.sortOrder} </td>
                                    <td style={{}} className={'table-line'}>{folder.title}</td>
                                    <td style={{}}> {folder.description} </td>
                                    <td> {Math.floor(Math.random() * 10)} </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {showModalFolderView ? <FolderView onClose={folderViewOnClose} folder={folders[selectedFolder]} /> : null}
            {isLoading ? <CameraSpinnerModal /> : null}
            {showUploadImg ? <UploadPhotoModal folderId={folders[selectedFolder].id} onClose={() => setShowUploadImg(false)} /> : null}
        </>
    );
};

export default UserSettings;