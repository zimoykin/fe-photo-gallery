import React, { useEffect, useState } from 'react';
import './styles/gallery-style.css';
import { useParams } from 'react-router-dom';
import { IProfile } from '../../interfaces/profile.interface';
import { IUserFolder } from '../../interfaces/folder.interface';
import { apiFetchFoldersByProfileId, apiFetchUserProfileById } from '../../api/api-gallery';
import CameraSpinnerModal from '../camera-spinner/camera-spinner-modal.component';
import FolderV2 from '../folders/folder-component';
import Avatar from '../avatar/avatar-component';

const GalleryV2: React.FC = () => {

    const [userProfile, setUserProfile] = useState<IProfile | null>(null);
    const { profileId } = useParams<{ profileId: string; }>();

    const [folders, setFolders] = useState<IUserFolder[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [showUserData, setShowData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (profileId) {
                const _userProfile = await apiFetchUserProfileById(profileId);
                const _folders = await apiFetchFoldersByProfileId(profileId);
                setUserProfile(_userProfile);
                setFolders((fld) => [..._folders]);
            }
        };

        setIsLoading(true);
        fetchData().finally(() => {
            setIsLoading(false);
            setShowData(true);
        });

    }, [profileId]);




    return (
        <div className='gallery-v2-container'>
            <div className='gallery-v2-box shadow'>
                <div className={`gallery-v2-box-owner ${showUserData && 'global-background-layer'}`}>
                    <div className='gallery-v2-box-person'>
                        <Avatar url={userProfile?.url} canShowImage={(res) => setShowData(res)} />
                        <div className='gallery-v2-box-person-data'>
                            <h1 className='global-title'>{userProfile?.name}</h1>
                            <span className='scale-m'>{userProfile?.location ?? 'no location'}</span>
                            {/* <br /> */}
                            <span>{folders?.length} folders</span>
                            <span>{folders?.length * 10} photos</span>
                            {/* <br /> */}
                            <span className='scale-m'>
                                {userProfile?.equipment?.find(e => (e.type === 'camera' && e.favorite))?.name ?? 'no information'}
                                ({userProfile?.equipment?.filter(e => e.type === 'camera')?.length ?? 0})
                            </span>
                            <span className='scale-m'>
                                {userProfile?.equipment?.find(e => (e.type === 'lens' && e.favorite))?.name ?? 'no information'}
                                ({userProfile?.equipment?.filter(e => e.type === 'lens')?.length ?? 0})
                            </span>
                        </div>
                    </div>
                </div>

                <div className='gallery-v2-box-gallery '>
                    {folders?.map((folder) => (
                        <div className='gallery-v2-box-folder' key={folder.id}>
                            <FolderV2 folder={folder} />
                        </div>
                    ))}
                </div>
            </div>
            {isLoading && <CameraSpinnerModal />}
        </div>
    );
};
export default GalleryV2;