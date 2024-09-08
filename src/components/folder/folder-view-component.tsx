import React, { useState } from "react";
import './folders-style.css';
import { apiCreateFolder, apiUpdateFolderById, IUserFolder } from "../../api/api-gallery";
import CameraSpinnerModal from "../camera-spinner/camera-spinner-modal.component";


interface Props {
    onClose: () => void,
    folder?: IUserFolder;
}

const FolderView: React.FC<Props> = ({ onClose, folder }: Props) => {

    const [isLoading, setIsLoading] = useState(false);

    const [title, setTitle] = useState(folder?.title ?? '');
    const [description, setDescription] = useState(folder?.description ?? '');
    const [bgColor, setBgColor] = useState(folder?.bgColor ?? '');
    const [color, setColor] = useState(folder?.color ?? '');
    const [sortOrder, setSortOrder] = useState(folder?.sortOrder ?? 0);


    const handleSaveBtn = async () => {
        setIsLoading(true);
        const body = {
            title,
            description,
            bgColor,
            color,
            sortOrder
        };

        if (folder?.id) {
            await apiUpdateFolderById(folder.id, body).finally(() => setIsLoading(false));
        } else {
            await apiCreateFolder(body).finally(() => setIsLoading(false));
        }
    };

    return (
        <>
            {isLoading ? <CameraSpinnerModal /> : null}
            <div className="folder-view-modal" onClick={onClose}>
                <div className="folder-view-container" onClick={(e) => e.stopPropagation()}>
                    <div className="command-panel">
                        <i className="fas fa-times" onClick={onClose} />
                        <i className="fas fa-check" onClick={handleSaveBtn} />
                    </div>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                    <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description" />
                    <input value={bgColor} onChange={(e) => setBgColor(e.target.value)} placeholder="bgColor" />
                    <input value={color} onChange={(e) => setColor(e.target.value)} placeholder="color" />
                    <input value={sortOrder} onChange={(e) => setSortOrder(parseInt(e.target.value))} placeholder="sortOrder" />
                </div>
            </div>
        </>
    );
};


export default FolderView;;