import React, { useEffect, useState } from 'react';
import './styles/gallery-style.css';
import { Profile } from '../../features/profile/profile-slice';
import { IUserFolder } from '../../api/api-gallery';
import CameraSpinner from '../camera-spinner/camera-spinner.component';

const GalleryV2: React.FC = () => {

    const [userProfile, setUserProfile] = useState<Profile | null>(null);
    const [folders, setFolders] = useState<IUserFolder[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [showUserData, setShowData] = useState(false);

    const [equipment, setEquipment] = useState([{
        id: '1',
        type: 'Camera',
        name: 'Canon EOS 650',
        favourite: true,
    },
    {
        id: '2',
        type: 'Camera',
        name: 'Canon EOS 5D',
        favourite: false,
    }, {
        id: '3',
        type: 'Lens',
        name: 'Canon EF 50mm f/1.8 STM',
        favourite: true,
    }
    ]);

    useEffect(() => {
        //fake api call
        setIsLoading(true);
        setTimeout(() => {
            setUserProfile({
                email: "pLhP1@example.com",
                id: "1",
                name: "Valentine Petrov",
                location: "Berlin, Germany",
                image: "/ava-mock.jpg",
            });
            setIsLoading(false);
        }, 3000);
    }, []);


    return (
        <div className='gallery-v2-container'>
            <div className='gallery-v2-box'>
                <div className={`gallery-v2-box-owner ${showUserData && 'global-background-layer'}`}>
                    <div className='gallery-v2-box-person'>
                        {!showUserData && <div><CameraSpinner /></div>}
                        <img hidden={!showUserData} className='shadow scale-s' src={userProfile?.image} alt=""
                            onLoad={() => setShowData(true)}
                        />
                        {showUserData && <div className='gallery-v2-box-person-data'>
                            <h1 className='global-title'>{userProfile?.name}</h1>
                            <span className='scale-m'>{userProfile?.location ?? 'no location' }</span>
                            <br />
                            <span>{folders.length} folders</span>
                            <span>{folders.length * 10} photos</span>
                            <br />
                            <span className='scale-m'>
                                {equipment.find(e => (e.favourite && e.type === 'Camera'))?.name ?? 'no fauvourite camera'}
                                ({equipment.filter(e => e.type === 'Camera').length ?? 0})
                            </span>
                            <span className='scale-m'>
                                {equipment.find(e => (e.favourite && e.type === 'Lens'))?.name ?? 'no fauvourite lens'}
                                ({equipment.filter(e => e.type === 'Lens').length ?? 0})
                            </span>
                        </div>}
                        <br />
                    </div>
                </div>

                <div className='gallery-v2-box-gallery '>
                    <h1>Gallery folders</h1>
                </div>
            </div>
        </div>
    );
};
export default GalleryV2;