import React, { useEffect, useState } from 'react';
import Folder from "./folder-component";
import { apiFetchUserFolders, IUserFolder } from "../../api/api-gallery";
import { useDispatch } from "react-redux";
import { storeFolders } from "../../features/folders/folders-slice";
import { useNavigate } from "react-router-dom";
import FolderSpinnerComponent from "./folder-spinner-component";
import './styles/folders-style.css';

const Folders: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [folders, setFolders] = useState<IUserFolder[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        apiFetchUserFolders().then((folders) => {
            console.log(folders);
            dispatch(
                storeFolders(folders)
            );
            setFolders(folders);
        }).finally(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }).catch(() => {
            setIsLoading(false);
            navigate('/login');
        });
    }, [dispatch, navigate]);

    const [choosen, setChoosen] = useState(-1);

    const onClickLine = (ind: number) => {
        if (ind === choosen) {
            setChoosen(-1);
        } else {
            setChoosen(ind);
        }
    };

    return (
        <div className="folder-container">
            {isLoading ? <FolderSpinnerComponent /> : <>
                {
                    folders.map((folder, index) => {
                        return (
                            <Folder
                                bgColor={folder.bgColor}
                                textColor={folder.color}
                                text={folder.title}
                                isOpen={index === choosen ? true : undefined}
                                key={index}
                                folderId={folder.id}
                                onClick={() => { onClickLine(index); }}
                            />
                        );
                    })
                }
            </>}
        </div>
    );
};

export default Folders;