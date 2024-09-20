import React from 'react';
import './styles/avatar-style.css';

interface Props {
    canShowImage?: (res: boolean) => void;
    onClick?: () => void;
    url?: string;
}

const Avatar: React.FC<Props> = ({
    onClick,
    url
}: Props) => {
    return (
        <div className='avatar-container-person'>
            <div
                onClick={onClick}
                className='avatar-container-person-img shadow scale-s'
                style={{ backgroundImage: `url(${url})` }}
            />
            <div />

        </div>
    );
};


export default Avatar;