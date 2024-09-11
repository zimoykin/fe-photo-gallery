import React, { useRef } from 'react';
import './styles/folders-style.css';
import Galery from "../gallery/gallery-component";

interface Props {
    bgColor: string; //TODO
    textColor: string;
    text: string;
    isOpen?: true;
    folderId: string;
    onClick: () => void;
}

const Folder: React.FC<Props> = ({ folderId, bgColor, textColor, text, isOpen, onClick }: Props) => {
    const folderRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        onClick();
        setTimeout(() => {
            if (folderRef.current) {
                const rect = folderRef.current.getBoundingClientRect();
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const elementPosition = rect.top + scrollTop;
                const offsetPosition = elementPosition - (window.innerHeight / 2) + (rect.height / 2);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 500);
    };

    return (
        <>
            <div
                className={'folder-line' + (isOpen ? '-selected' : '')}
                ref={folderRef}
                style={{
                    backgroundColor: bgColor,
                    color: textColor,
                }} onClick={handleClick}>

                <div style={{ paddingLeft: '20px', paddingTop: '10px', fontSize: `${isOpen ? '35px' : '18px'}` }}>
                    <b>{text.toUpperCase()}</b>
                </div>
                {isOpen
                    ? <Galery folderId={folderId}
                    />
                    : null
                }
            </div>
        </>
    );
};

export default Folder;