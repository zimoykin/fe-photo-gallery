import React, { useEffect, useState } from 'react';
import './user-settings-style.css';
import { logout } from '../../features/auth/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import UserFolders from './user-folders/user-folders-component';
import UserEquipment from './user-equipment/user-equipment-component';
import CameraSpinnerModal from '../camera-spinner/camera-spinner-modal.component';


const UserSettings: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [ava, setAva] = useState('ava-mock.jpg');
    const [email, setEmail] = useState('john.doe@me.com');
    const [name, setName] = useState('John Doe');
    const [camera, setCamera] = useState('Canon EOS 650');
    const [lens, setLens] = useState('Canon Ef 50mm f/1.4L USM');

    const profile = useSelector((state: RootState) => state.profile);
    const dispatch = useDispatch();
    const handleLogoutClick = () => {
        console.log('handleLogoutClick');
        setIsLoading(true);
        dispatch(logout());
    };


    useEffect(() => {
        if (profile.user) {
            setEmail(profile.user.email);
            setName(profile.user.name);
            //TODO: add camera and lens to user model
            // setCamera(profile.user.camera);
            // setLens(profile.user.lens);
            if (profile.user.image) {
                setAva(profile.user.image);
            }
            if (profile.user.camera) {
                setCamera(profile.user.camera);
            }
            if (profile.user.lens) {
                setLens(profile.user.lens);
            }
        }

    }, [profile]);

    return (
        <>
            <div className='user-settings-container'>
                <div className='user-settings-box'>
                    <div className='user-info-container'>
                        <div
                            className="avatar"
                        >
                            <div>
                                <img className="avatar-img"
                                    alt=''
                                    src={ava} />

                            </div>
                        </div>
                        <div className='user-info-user-data'>
                            <h1>{name}</h1>
                            <h3
                                onClick={() => {
                                    window.location.href = `mailto:${email}`;
                                }}
                            >{email}</h3>
                            <h3>{camera}</h3>
                            <h3>{lens}</h3>
                        </div>
                        <div className='user-info-buttons-folder-equip-container'>
                            <button className='user-settings-button'>
                                <h1>folders</h1>
                            </button>
                            <button className='user-settings-button'>
                                <h1>Equipment</h1>
                            </button>
                        </div>
                        <div className='user-info-button-container'>
                            <button className='user-settings-button'
                                onClick={handleLogoutClick} >
                                <h1>logout</h1>
                            </button>
                        </div>
                    </div>
                    <div className='user-folders-equipment-container'>
                        <div className='user-folders-equipment-container-box'>
                            <UserFolders />
                        </div>
                        <div className='user-folders-equipment-container-box'>
                            <UserEquipment />
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && <CameraSpinnerModal />}
        </>
    );
};

export default UserSettings;