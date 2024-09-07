import React, { useEffect, useState } from 'react';
import './user-settings-style.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { IUserFolder } from '../../api/api-gallery';


const UserSettings: React.FC = () => {

    const foldersStore = useSelector((state: RootState) => state.folders);
    const [folders, setFolders] = useState<IUserFolder[]>([]);

    const [selectedFolder, setSelectedFolder] = useState(-1);

    useEffect(() => {
        setFolders(foldersStore.folders);
    }, [foldersStore]);

    const handleSelectedFolder = (ind: number) => {
        if (selectedFolder === ind) {
            setSelectedFolder(-1);
        } else {
            setSelectedFolder(ind);
        }
    };

    return (
        <div id='user-settings-container'>
            <div className='command-panel'>
                <div className='icon'>
                    <i className="fas fa-plus" />
                </div>
                <div className='icon'>
                    <i className="fas fa-minus" />
                </div>
                {selectedFolder >= 0 ? <div className='icon'>
                    <i className="fas fa-edit" />
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
                            folders.map((folder, ind) => <tr key={folder.id}>
                                <td className={selectedFolder === ind ? 'folder-selected' : ''} onClick={() => handleSelectedFolder(ind)} style={{ cursor: 'pointer' }}>{folder.title}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserSettings;