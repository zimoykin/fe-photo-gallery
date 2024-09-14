import React, { useEffect, useState } from "react";
import './styles/folder-create-update-style.css';
import { apiCreateFolder, apiFetchUserFolderByFolderId, apiUpdateFolderById } from "../../../api/api-gallery";
import CameraSpinnerModal from "../../camera-spinner/camera-spinner-modal.component";
import { HexColorPicker } from "react-colorful";
import FolderCreateUpdateImages from "./folder-create-update-images-component";

interface Props {
    folderId?: string;
    onClose: () => void;
}

const FolderCreateUpdate: React.FC<Props> = ({
    folderId,
    onClose
}: Props) => {

    const [title, setTitle] = useState('Your folder name here');
    const [descr, setDescr] = useState('Describe your folder here');
    const [sortOrder, setSortOrder] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [bg, setBg] = useState('rgba(18, 121, 107, 0.9)');
    const [color, setColor] = useState('rgba(205, 200, 50, 0.9)');

    const [pickMode, setPickMode] = useState<'color' | 'bg'>('bg');

    useEffect(() => {
        if (folderId) {
            setIsLoading(true);
            apiFetchUserFolderByFolderId(folderId)
                .then((folder) => {
                    setTitle(folder.title);
                    setDescr(folder.description);
                    setBg(folder.bgColor);
                    setColor(folder.color);
                    setSortOrder(folder.sortOrder);
                }).catch((error) => console.log(error))
                .finally(() => setIsLoading(false));
        }
    }, [folderId]);

    const handleCreateUpdateClick = () => {
        if (folderId) {
            setIsLoading(true);
            apiUpdateFolderById(
                folderId,
                { title, description: descr, bgColor: bg, color, sortOrder }
            ).finally(() => {
                setIsLoading(false);
                onClose();
            });
        } else {
            setIsLoading(true);
            apiCreateFolder({ title, description: descr, bgColor: bg, color, sortOrder })
                .finally(() => {
                    setIsLoading(false);
                    onClose();
                });
        }
    };

    return <div className="folder-create-update-container"
        onClick={onClose}
    >
        <div className="folder-create-update-box"
            onClick={(e) => e.stopPropagation()}>
            <div className="folder-create-update-folder-data">
                <div className="folder-create-update-title-desc">
                    <div className="folder-create-update-title-save-btn">
                        <input
                            style={{ backgroundColor: bg, color: color }}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className="folder-create-update-buttons">
                            <button
                                onClick={handleCreateUpdateClick}
                            >{folderId ? 'Update folder' : 'Create folder'}</button>
                        </div>
                    </div>
                    <textarea
                        style={{ backgroundColor: bg, color: color }}
                        value={descr}
                        onChange={(e) => setDescr(e.target.value)} />
                </div>
                <div className="folder-create-update-colors">
                    <div className="folder-create-update-colors-btns">
                        <div
                            onClick={() => setPickMode(pickMode === 'bg' ? 'color' : 'bg')}
                            style={{
                                backgroundImage: `linear-gradient(to right,  ${color} 0%,${bg} 100%)`,
                                minWidth: '100px',
                                color: color,
                                minHeight: '100px'
                            }}>
                            <h3 style={{ color: color }}>{
                                pickMode === 'bg' ? 'pick bg' : ' pick color'
                            }</h3>
                        </div>
                    </div>
                    <HexColorPicker
                        style={{
                            borderRadius: '15px',
                            border: '5px solid rgba(0, 0, 0, 0.55)',
                            boxShadow: 'rgba(0, 0, 0, 0.25) 5px 20px 28px, rgba(0, 0, 0, 0.22) 10px 10px 10px'
                        }}
                        color={pickMode === 'bg' ? bg : color} onChange={(e) => {
                            if (pickMode === 'bg') {
                                setBg(e);
                            } else {
                                setColor(e);
                            }
                        }} />

                </div>
                <div className="folder-create-update-images-mobile">
                    <FolderCreateUpdateImages folderId={folderId} />
                </div>
            </div>

            {/* images */}
            <div className="folder-create-update-images">
                <FolderCreateUpdateImages folderId={folderId} />
            </div>
        </div>
        {isLoading && <CameraSpinnerModal />}
    </div>;
};

export default FolderCreateUpdate;;