import React from 'react';
import Galery from "../gallery/gallery-component";

interface Props {
    bgColor: string; //TODO
    textColor: string;
    text: string;
    isOpen?: true;
    lineSize: string;
    folderId: string;
    onClick: () => void;
}

const Folder: React.FC<Props> = ({ folderId, bgColor, textColor, text, isOpen, lineSize, onClick }: Props) => {

    return (
        <>
            {/* TODO: move to css file */}
            <div
                className='folder-line'
                style={{
                    backgroundColor: bgColor,
                    height: lineSize,
                    color: textColor,
                }} onClick={onClick}>

                <div style={{ padding: '20px', fontSize: `${isOpen ? '35px' : '18px'}` }}>
                    <b>{text.toUpperCase()}</b>
                </div>
                {isOpen
                    ? <Galery folderId={folderId} />
                    : null
                }
            </div>
        </>
    );
};

export default Folder;