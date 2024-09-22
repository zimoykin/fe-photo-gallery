import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './styles/upload-images-style.css';
import CameraSpinnerModal from "../camera-spinner/camera-spinner-modal.component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { IUserFolder } from "../../interfaces/folder.interface";
import { ApiClient } from "../../api/networking/api-client";
import PhotosTable from "./photos-component";
import { appendFolders } from "../../features/folders/folders-slice";
import { toast } from "react-toastify";


const UploadImages: React.FC = () => {

    const { folderId } = useParams<{ folderId: string; }>();
    const { profile } = useSelector((state: RootState) => state.profile);
    const { folders: storedFolders } = useSelector((state: RootState) => state.folders);

    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);

    const [favorite] = useState<string>('');
    const [folder, setFolder] = useState<IUserFolder | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchFolderData = useCallback(async (): Promise<IUserFolder> => {
        return await ApiClient.get<IUserFolder>(`/folders/${folderId}`);
    }, [folderId]);

    const updateFolderInStore = () => {
        if (folder) {
            toast.info('Folder updated successfully', { toastId: 'folder-updated' });
            const updatedFolder = { ...folder };
            dispatch(
                appendFolders(
                    updatedFolder
                )
            );

            setFolder(updatedFolder);
        }
    };

    useEffect(() => {
        if (folderId && profile?.id) {
            setIsLoading(true);
            fetchFolderData().finally(() => setIsLoading(false))
                .then((fld) => {
                    setFolder(fld);
                    // updateFolderInStore();
                });
        }
    }, [folderId, profile?.id, profile?.equipment, fetchFolderData, dispatch]);

    const handleSaveFolderData = () => {
        if (folder?.id) {
            setIsLoading(true);
            ApiClient.put<IUserFolder>(`/folders/${folder.id}`, folder)
                .finally(() => {
                    updateFolderInStore();
                    setEditMode(false);
                    setIsLoading(false);
                })
                .then(resp => {
                    if (resp.id) {
                        setFolder(resp);
                    }
                }).catch(err => console.error(err));
        }
    };

    const handleCancelFolderData = () => {
        setEditMode(false);
        if (folderId && storedFolders[folderId]) {
            setFolder({ ...storedFolders[folderId] });
        }
    };

    return <div className="w-100 h-100 flex-column">
        <div className="w-100 h-100">

            <div className="w-100 upload-header-container">
                <div className="upload-header-blurred-image"
                    style={{
                        backgroundImage: `url(${favorite})`
                    }}
                >
                </div>
                <div className="upload-header-content-overlay flex-row w-100 shadow p-10">
                    <div className="flex w-70 align-left flex-column">
                        <div className="scale-s">
                            {/* title */}
                            {editMode ? <div className="">
                                <div className="radius-5 shadow scale-m pt-3">
                                    <input
                                        className="global-secondary-background-layer p-3"
                                        onChange={(e) => {
                                            if (folder) {
                                                folder.title = e.target.value;
                                                setFolder({ ...folder });
                                            }
                                        }}
                                        value={folder?.title} />
                                </div>
                            </div>
                                : <span className="radius-5"
                                    style={{
                                        color: folder?.color,
                                        backgroundColor: folder?.bgColor
                                    }}
                                >{folder?.title}</span>
                            }
                        </div>
                        <div>

                        </div>
                        {editMode ? <div className="radius-5 shadow scale-m pt-3">
                            <input
                                className="global-secondary-background-layer p-3 radius-5"
                                onChange={(e) => {
                                    if (folder) {
                                        folder.description = e.target.value;
                                        setFolder({ ...folder });
                                    }
                                }}
                                value={folder?.description} />
                        </div>
                            : <span className="pt-10 radius-5"
                            >{folder?.description}</span>
                        }

                        <div className="flex-row gap">
                            {editMode ? <div className="">
                                <div className="radius-5 shadow scale-m pt-3">
                                    <input
                                        className="global-secondary-background-layer p-3 radius-5"
                                        onChange={(e) => {
                                            if (folder) {
                                                folder.color = e.target.value;
                                                setFolder({ ...folder });
                                            }
                                        }}
                                        value={folder?.color} />
                                </div>
                            </div>
                                : <span className="radius-5"
                                >{folder?.color}</span>
                            }

                            {editMode ? <div className="">
                                <div className="radius-5 shadow scale-m pt-3"
                                >
                                    <input
                                        className="global-secondary-background-layer p-3 radius-5"
                                        onChange={(e) => {
                                            if (folder) {
                                                folder.bgColor = e.target.value;
                                                setFolder({ ...folder });
                                            }
                                        }}
                                        value={folder?.bgColor} />
                                </div>
                            </div>
                                : <span className="radius-5"
                                >{folder?.bgColor}</span>
                            }
                        </div>
                    </div>
                    <div className="align-right w-30 p-10 h-100">
                        {!editMode && <div className="palitra-4">
                            <i className="scale-s p-10 hover-bg fas fa-pen"
                                onClick={() => setEditMode(!editMode)} />
                        </div>}
                        {editMode && <div>
                            <i className="pointer scale-l palitra-4 p-10 hover-bg  fas fa-save"
                                onClick={handleSaveFolderData} />
                            <i className="pointer scale-l p-10 fas palitra-1 fa-close"
                                onClick={handleCancelFolderData} />
                        </div>}
                    </div>
                </div>

                {(folderId) && <div className="upload-table">
                    <PhotosTable
                        folderId={folderId} />
                </div>}
            </div>
        </div>;
        {isLoading && <CameraSpinnerModal />}
    </div >;
};

export default UploadImages;