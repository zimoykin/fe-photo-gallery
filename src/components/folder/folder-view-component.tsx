import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiClient } from "../../api/networking/api-client";
import { IPhoto } from "../../interfaces/photo.interface";
import PhotoCard from "../photo-card/photo-card";

const FolderView: React.FC = () => {

    const { folderId } = useParams<{ folderId: string; }>();
    const [photos, SetPhotos] = useState<IPhoto[]>([]);

    useEffect(() => {
        ApiClient.get<IPhoto[]>(`/photos/${folderId}/preview`).then((photos) => SetPhotos(photos));
    }, [folderId]);

    return <div className="global-background-layer w-100 h-100 scroll p-10">
        <div className="flex-center wrap gap">
            {photos.map((photo) =>
                <div key={photo.id} className="gap">
                    <PhotoCard photo={photo} />
                </div>
            )}
        </div>
    </div>;
};
export default FolderView;