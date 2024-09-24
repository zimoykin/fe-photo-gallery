import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiClient } from "../../api/networking/api-client";
import PhotoCard from "../photo-card/photo-card";
import { IPublicPhoto } from "../../interfaces/photo-profile.interface";

const FolderView: React.FC = () => {

    const { folderId, profileId } = useParams<{ folderId: string; profileId: string; }>();
    const [photos, SetPhotos] = useState<IPublicPhoto[]>([]);

    useEffect(() => {
        if (folderId && profileId)
            ApiClient.get<IPublicPhoto[]>(`/public/photos/${profileId}/${folderId}`).then((photos) => SetPhotos(photos));
    }, [folderId, profileId]);

    return <div className="global-background-layer w-100 h-100 scroll p-10">
        <div className="flex-center wrap gap">
            {photos.map(({ photo, profile }) =>
                <div key={photo.id} className="gap">
                    <PhotoCard
                        photo={photo}
                        profileImageUrl={profile.url}
                    />
                </div>
            )}
        </div>
    </div>;
};
export default FolderView;