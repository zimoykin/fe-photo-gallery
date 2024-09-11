import React from "react";
import { IPhoto } from "../../api/api-gallery";

interface Props {
    photo: IPhoto;
}

const ImageOverlays: React.FC<Props> = ({ photo }: Props) => {
    return (
        <div className="image-overlays">
            <div className="image-overlay">{photo.location}</div>

            <div className="image-overlay">{photo.camera}</div>
            <div className="image-overlay">{photo.lens}</div>
            <div className="image-overlay">{photo.film}</div>
        </div>
    );
};


export default ImageOverlays;