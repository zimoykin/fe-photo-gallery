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

    const [, setLoading] = useState(true);

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
            <div
                className='avatar-container-person-img shadow scale-s'
                style={{ backgroundImage: `url(${url})` }}
                onLoad={handleOnImageLoad}
                onError={(er) => handleOnImageError(er)}
            />
            <div />

        </div>
    );
};


export default Avatar;