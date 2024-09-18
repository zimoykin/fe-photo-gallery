import React, { useState } from 'react';
import './styles/avatar-style.css';

interface Props {
    canShowImage?: (res: boolean) => void;
    url?: string;
}

const Avatar: React.FC<Props> = ({
    canShowImage,
    url
}: Props) => {

    const [loading, setLoading] = useState(true);

    const handleOnImageLoad = () => {
        setLoading(false);
        if (canShowImage) {
            canShowImage(true);
        }
    };

    const handleOnImageError = (err: React.SyntheticEvent) => {
        console.log(err);
        setLoading(false);
        if (canShowImage) {
            canShowImage(false);
        }
    };

    return (
        <div className='avatar-container-person'>
            <img
                hidden={loading}
                className='shadow scale-s'
                src={url ?? 'ava-mock.jpg'} alt=""
                onLoad={handleOnImageLoad}
                onError={(er) => handleOnImageError(er)}
            />
            <div />

        </div>
    );
};


export default Avatar;