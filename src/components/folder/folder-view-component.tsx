import React, { useState } from "react";
import './styles/folder-view-style.css';
import { apiCreateFolder, apiUpdateFolderById, IUserFolder } from "../../api/api-gallery";
import CameraSpinnerModal from "../camera-spinner/camera-spinner-modal.component";
import { ColorResult, SketchPicker } from 'react-color';
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface Props {
    onClose: () => void,
    folder?: IUserFolder;
}

const FolderView: React.FC<Props> = ({ onClose, folder }: Props) => {

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const [isLoading, setIsLoading] = useState(false);
    const selector = useSelector((state: RootState) => state.folders);

    const [title, setTitle] = useState(folder?.title ?? 'My Album');
    const [description, setDescription] = useState(folder?.description ?? 'Here is my photos my...');
    const [bgColor, setBgColor] = useState(folder?.bgColor ?? getRandomColor());
    const [color, setColor] = useState(folder?.color ?? getRandomColor());
    const [sortOrder, setSortOrder] = useState(folder?.sortOrder ?? selector.folders?.length + 1);


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
            await apiUpdateFolderById(folder.id, body).finally(() => { setIsLoading(false); onClose(); });
        } else {
            await apiCreateFolder(body).finally(() => {
                setIsLoading(false);
                onClose();
            });
        }
    };

    return (
        <>
            <div className="folder-view-modal" onClick={onClose}>
                <div className="folder-view-container" onClick={(e) => e.stopPropagation()}>
                    <div className="command-panel">
                        <div style={{
                            color: color, backgroundColor: bgColor, width: '100%', height: '100%', borderRadius: '10px', padding: '20px',
                            fontWeight: 'bold', fontSize: '26px', textAlign: 'start', display: 'flex', alignItems: 'center'
                        }} >
                            {title}
                        </div>
                        <div style={{
                            height: '100%', borderRadius: '10px', padding: '20px',
                            fontWeight: 'bold', fontSize: '26px', textAlign: 'start', display: 'flex', alignItems: 'center'
                        }} >
                            <i className="fas fa-times" style={{ backgroundColor: 'tomato', fontSize: '44px' }} onClick={onClose} title="save" />
                            <i className="fas fa-check" style={{ backgroundColor: 'green', fontSize: '44px' }} onClick={handleSaveBtn} />
                        </div>
                    </div>
                    <div style={{ padding: '5px', margin: '5px', display: 'flex', flexDirection: 'row' }}>
                        <div>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description" />
                            <input value={sortOrder} onChange={(e) => setSortOrder(parseInt(e.target.value))} placeholder="sortOrder" />
                        </div>
                        <div className="color-picker-container">
                            <p>color</p>
                            <SketchPicker
                                color={color}
                                onChangeComplete={(color: ColorResult) => setColor(color.hex)}
                            />
                            <p>bg color</p>
                            <SketchPicker
                                color={bgColor}
                                onChangeComplete={(color: ColorResult) => setBgColor(color.hex)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {isLoading ? <CameraSpinnerModal /> : null}
        </>
    );
};


export default FolderView;;