import React, { useEffect, useState } from 'react';
import Folder from "./folder-component";
import { apiFetchUserFolders, IUserFolder } from "../../api/api-gallery";
import { useDispatch } from "react-redux";
import { storeFolders } from "../../features/folders/folders-slice";
import { useSearchParams } from "react-router-dom";
import FolderSpinnerComponent from "./folder-spinner-component";
import './styles/folders-style.css';

const Folders: React.FC = () => {

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const [folders, setFolders] = useState<IUserFolder[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const userId = searchParams.get('userId');
        if (userId) {
            setIsLoading(true);
            apiFetchUserFolders(userId).then((folders) => {
                dispatch(
                    storeFolders(folders)
                );
                setFolders(folders);

                if (searchParams.get('folderId')) {
                    const index = folders.findIndex(f => f.id === searchParams.get('folderId'));
                    if (index >= 0) {
                        setChoosen(index);
                    }
                }

            }).finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }).catch(() => {
                setFolders([]);
                setIsLoading(false);
            });
        }
    }, [dispatch, searchParams]);

    const [choosen, setChoosen] = useState(-1);

    const onClickLine = (ind: number) => {
        if (ind === choosen) {
            setChoosen(-1);
        } else {
            setChoosen(ind);
            const userId = searchParams.get('userId')!;
            const folderId = folders[ind].id;
            setSearchParams({ userId, folderId });
        }
    };

    return (
        <div className="folder-container">
            {isLoading ? <FolderSpinnerComponent /> : <>
                {
                    folders?.map((folder, index) => {
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