import React, { useEffect, useState } from 'react';
import './user-settings-style.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { IUserFolder } from '../../api/api-gallery';
import FolderView from '../folder/folder-view-component';


const UserSettings: React.FC = () => {

    const foldersStore = useSelector((state: RootState) => state.folders);
    const [folders, setFolders] = useState<IUserFolder[]>([]);

    const [showModalFolderView, setShowModalFolderView] = useState(false);

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

    return (
        <>
            <div id='user-settings-container'>
                <div className='command-panel'>
                    <div className='icon'>
                        <i className="fas fa-plus" />
                    </div>
                    <div className='icon'>
                        <i className="fas fa-minus" />
                    </div>
                    {selectedFolder >= 0 ? <div className='icon'>
                        <i className="fas fa-edit" onClick={() => setShowModalFolderView(true)} />
                    </div> : null}

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
                                    onClick={() => handleSelectedFolder(ind)}
                                    className={selectedFolder === ind ? 'table-line' : 'table-line'}
                                    key={folder.id} style={{ cursor: 'pointer', backgroundColor: folder.bgColor }} >
                                    <td className={selectedFolder === ind ? 'folder-selected' : 'folder'}>
                                        <div ></div>
                                    </td>
                                    <td className={'table-line'}>{folder.title}</td>
                                    <td > bg color </td>
                                    <td > color </td>
                                    <td > {folder.sortOrder} </td>
                                    {/* <td >
                                    <div className='icon'>
                                        <i className="fas fa-plus" />
                                    </div>
                                </td> */}
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {showModalFolderView ? <FolderView onClose={() => setShowModalFolderView(false)} folder={folders[selectedFolder]} /> : null}
        </>
    );
};

export default UserSettings;