import React from 'react';
import Galery from "../gallery/gallery-component";

interface Props {
    bgColor: string; //TODO
    textColor: string;
    text: string;
    isOpen?: true;
    lineSize: string;
    onClick: () => void;
}

const Folder: React.FC<Props> = ({ bgColor, textColor, text, isOpen, lineSize, onClick }: Props) => {

    return (
        <>
            {/* TODO: move to css file */}
            <div style={{
                backgroundColor: bgColor,
                height: lineSize,
                color: textColor,
                fontFamily: 'inter',
                fontSize: '40px',
                fontWeight: 'bolder',
                paddingLeft: '10px',
                margin: '0px 0px 0px 0px',
                cursor: 'pointer',
                verticalAlign: 'middle',
                width: "100%"
            }} onClick={onClick}>

                {text.toUpperCase()}
                {isOpen
                    ? <Galery />
                    : null
                }
            </div>
        </>
    );
};

export default Folder;