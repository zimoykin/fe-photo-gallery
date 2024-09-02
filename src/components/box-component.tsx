import { useState } from "react";
import BoxLine from "./box-line-component";

const Box: React.FC = () => {

    //TODO: this line should come from the backend
    const folders = [
        {
            bgColor: "#FF6666",
            textColor: "#FFFFFF",
            text: "Spain"
        },
        {
            bgColor: "#FFBD55",
            textColor: "#FFFFFF",
            text: "Italy"
        },
        {
            bgColor: "#FFFF66",
            textColor: "#000000",
            text: "Germany"
        },
        {
            bgColor: "#557C51",
            textColor: "#FFFFFF",
            text: "Denmark",
        },
        {
            bgColor: "#559F61",
            textColor: "#FFFFFF",
            text: "Turkey"
        },
        {
            bgColor: "#23AEAE",
            textColor: "#FFFFFF",
            text: "Portugal"
        },
        {
            bgColor: "#87CEFA",
            textColor: "#FFFFFF",
            text: "France"
        },
    ];

    // const heightPerFolder = `${100 / (folders.length)}vh`;

    const [lineSize, setLineSize] = useState(`${100 / (folders.length)}vh`);
    const [openLineSize, setOpenLineSize] = useState('75vh');
    const [choosen, setChoosen] = useState(-1);

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
            {folders.map((folder, index) => {
                return (
                    <BoxLine
                        bgColor={folder.bgColor}
                        textColor={folder.textColor}
                        text={folder.text}
                        isOpen={index === choosen ? true : undefined}
                        lineSize={index === choosen ? openLineSize : lineSize}
                        key={index}
                        onClick={() => { onClickLine(index); }}
                    />
                );
            })}
        </>
    );
};

export default Box;