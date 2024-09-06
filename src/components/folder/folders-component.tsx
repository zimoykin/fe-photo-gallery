import { useEffect, useState } from "react";
import React from 'react';
import Folder from "./folder-component";
import { apiFetchUserFolders, IUserFolder } from "../../api/api-gallery";
import CameraSpinnerModal from "../camera-spinner/camera-spinner-modal.component";

const Folders: React.FC = () => {

    const [folders, setFolders] = useState<IUserFolder[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        apiFetchUserFolders().then((folders) => {
            setFolders(folders);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    const [lineSize, setLineSize] = useState(`${100 / (folders.length)}vh`);
    const [openLineSize] = useState('75vh'); //TODO
    const [choosen, setChoosen] = useState(-1);

    useEffect(() => {
        setLineSize(`${100 / (folders.length)}vh`);
    }, [folders]);

    const onClickLine = (ind: number) => {
        if (ind === choosen) {
            setChoosen(-1);
            setLineSize(`${100 / (folders.length)}vh`);
        } else {
            setChoosen(ind);
            setLineSize(`${50 / (folders.length)}vh`);
        }
    };

    return (
        <>
            {isLoading ? <CameraSpinnerModal /> : <>
                {
                    folders.map((folder, index) => {
                        return (
                            <Folder
                                bgColor={folder.bgColor}
                                textColor={folder.color}
                                text={folder.title}
                                isOpen={index === choosen ? true : undefined}
                                lineSize={index === choosen ? openLineSize : lineSize}
                                key={index}
                                folderId={folder.id}
                                onClick={() => { onClickLine(index); }}
                            />
                        );
                    })
                } </>}
        </>
    );
};

export default Folders;