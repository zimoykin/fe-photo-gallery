import React, { useEffect, useState } from 'react';
import './user-settings-style.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import UserFolders from './user-folders/user-folders-component';
import UserEquipment from './user-equipment/user-equipment-component';
import CameraSpinnerModal from '../camera-spinner/camera-spinner-modal.component';
import FolderCreateUpdate from './folder-create-update/folder-create-update-component';
import Avatar from '../avatar/avatar-component';
import { useNavigate } from 'react-router-dom';
import { apiFetchFoldersByProfileId, apiFetchUserFolders, apiFetchUserProfile, apiUpdateProfile } from '../../api/api-gallery';
import { storeProfile } from '../../features/profile/profile-slice';
import { IProfile } from '../../interfaces/profile.interface';
import { IEquipment } from '../../interfaces/eqiupment.interface';
import { storeFolders } from '../../features/folders/folders-slice';
import { IUserFolder } from '../../interfaces/folder.interface';


const UserSettings: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { folders: StoredFolders } = useSelector((state: RootState) => state.folders) ?? [];
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { profile: storedProfile } = useSelector((state: RootState) => state.profile);

    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState<IProfile | null>(null);
    const [folders, setFolders] = useState<IUserFolder[]>([]);

    const [editMode, setEditMode] = useState<boolean>(false);
    const [editModeEquipment, setEditModeEquipment] = useState<boolean>(false);

    const [selectedFolder, setSelectedFolder] = useState<number>(-1);
    const [showFolderCreateUpdate, setShowCreateUpdateFolder] = useState<boolean>(false);

    useEffect(() => {
        if (isAuthenticated) {
            setIsLoading(true);
            apiFetchUserProfile().finally(() => setIsLoading(false))
                .then((profile) => {
                    dispatch(storeProfile(profile));
                    setProfile(profile);
                }).catch((error) => console.log(error));
            apiFetchFoldersByProfileId(profile?.id!)
                .then((folders) => {
                    dispatch(storeFolders(folders));
                    setFolders(folders);
                }).catch((error) => console.log(error));
        } else {
            navigate('/home');
        }
    }, [isAuthenticated, dispatch, navigate]);


    const handleClickEditFolder = (index: number) => {
        setSelectedFolder(index);
        setShowCreateUpdateFolder(true);
    };

    const handleClickCreateFolder = () => {
        setSelectedFolder(-1);
        setShowCreateUpdateFolder(true);
    };

    const handleFolderCreateUpdateClose = () => {
        setShowCreateUpdateFolder(false);
    };

    const handleCancelEditProfileClick = () => {
        setEditMode(false);
        if (storedProfile) {
            setProfile(storedProfile);
        }
    };

    const handleSaveProfileClick = () => {
        if (profile) {
            setIsLoading(true);
            console.log(profile);
            apiUpdateProfile(profile)
                .then((resp) => {
                    if (resp)
                        dispatch(storeProfile(resp));
                })
                .finally(
                    () => {
                        setEditMode(false);
                        setIsLoading(false);
                    });
        }
    };

    return (
        <>
            <div className='user-settings-container'>
                <div className='user-settings-box'>
                    <div className='user-info-container global-background-layer'>
                        <Avatar url={profile?.url ?? 'ava-mock.jpg'} />
                        <div className='user-info-user-data'>
                            <div className='scale-s flex-row flex-center p-2'
                            >
                                {editMode ? <input
                                    className='global-input w-80'
                                    onChange={(e) => {
                                        if (profile)
                                            setProfile({ ...profile, name: e.target.value });
                                    }}
                                    type="text" defaultValue={profile?.name} /> :

                                    <div className='flex-row flex-center w-100'>
                                        <h1>{profile?.name}</h1>
                                        <i className="fas fa-edit p-3"
                                            onClick={() => setEditMode(!editMode)} />
                                    </div>}

                            </div>


                            {editMode
                                ? <input className='global-input w-80'
                                    placeholder='contact email'
                                    type="email" defaultValue={profile?.email}
                                    onChange={(e) => {
                                        if (profile)
                                            setProfile({ ...profile, email: e.target.value });
                                    }}
                                />
                                :
                                <div className='flex-row flex-center scale-s p-2'>
                                    <i className="p-2 user-settings-icon fas fa-envelope" />
                                    <span
                                        onClick={() => {
                                            if (profile?.email)
                                                window.location.href = `mailto:${profile?.email}`;
                                        }}
                                    >{profile?.email ?? '! no email provided'}</span>
                                </div>
                            }

                            {
                                editMode
                                    ? <input className='global-input w-80'
                                        placeholder='location'
                                        type="text" defaultValue={profile?.location}
                                        onChange={(e) => {
                                            if (profile)
                                                setProfile({ ...profile, location: e.target.value });
                                        }}
                                    />
                                    : <div className='flex-row scale-s'>
                                        <i className="p-2 user-settings-icon fas fa-map-marker-alt" />
                                        <span className='p-2'>{profile?.location ?? '! no location provided'} </span>
                                    </div>
                            }

                            {editMode
                                ? <select className='global-input w-80' name="privateAccess" id="privateAccess">
                                    <option value="true">private</option>
                                    <option value="false">public</option>
                                </select>
                                :
                                <div className='scale-s flex-row flex-center'>
                                    <i className="p-2 fas fa-globe" />
                                    <span>{profile?.privateAccess ? 'private' : 'public'}</span>
                                </div>
                            }


                            {!editMode && <span>{profile?.equipment?.find(e => (e.type === 'camera' && e.favorite))?.name ?? '! no main camera provided'} </span>}
                            {!editMode && <span>{profile?.equipment?.find(e => (e.type === 'lens' && e.favorite))?.name ?? '! no main lens provided'} </span>}
                            {editMode ?
                                <input className='global-input w-80' placeholder='website' type="text" defaultValue={profile?.website} />
                                :
                                <span>{profile?.website ?? '! no website provided'}</span>}

                            {editMode && <textarea className='global-input w-80' placeholder='bio' defaultValue={profile?.bio} />}
                            {editMode && <div className='flex-space-between w-80'>
                                <div className='flex p-1 w-100 p-1 gap'>
                                    <button className='global-button primary p-10 shadow scale-s'
                                        onClick={handleSaveProfileClick}
                                    >
                                        save
                                    </button>

                                    <button className='global-button danger p-10 shadow scale-s'
                                        onClick={handleCancelEditProfileClick}
                                    >
                                        cancel
                                    </button>

                                </div>
                            </div>}

                        </div>
                    </div>
                    <div className='user-folders-equipment-container'>
                        <div className='user-folders-equipment-container-box'>
                            <UserFolders
                                folders={folders}
                                handleClickCreateFolder={handleClickCreateFolder}
                                handleClickEditFolder={handleClickEditFolder}
                            />
                        </div>
                        <div className='user-folders-equipment-container-box'>
                            <div className='user-equipment-command-panel gap' >
                                <i className="user-equipment-icon fa-solid fa-plus"
                                    onClick={() => {
                                        if (profile) {
                                            setProfile({
                                                ...profile,
                                                equipment: [...profile?.equipment ?? [], {
                                                    type: 'camera',
                                                    name: `Camera ${(profile.equipment?.filter(e => e.type === 'camera') ?? []).length + 1}`,
                                                    favorite: false
                                                }]
                                            });
                                            setEditModeEquipment(true);
                                        }
                                    }} />

                                {!editModeEquipment && <i className="user-equipment-icon fa-solid fa-pen"
                                    onClick={() => setEditModeEquipment(true)} />}
                                {editModeEquipment && <i className="p-2 fas fa-save palitra-4"
                                    onClick={() => {
                                        setEditModeEquipment(false);
                                        handleSaveProfileClick();
                                    }}
                                />}
                                {editModeEquipment && <i className="p-2 fas fas fa-history palitra-1"
                                    onClick={() => {
                                        setEditModeEquipment(false);
                                        handleCancelEditProfileClick();
                                    }}
                                />}
                            </div>
                            {
                                [...profile?.equipment ?? []].map((eq, index) => (
                                    <UserEquipment
                                        key={index}
                                        equipment={eq}
                                        addStar={() => {
                                            if (profile?.equipment) {
                                                const equip = profile.equipment[index];
                                                if (equip) {
                                                    const newEquipment: IEquipment = { ...equip, favorite: !equip.favorite };
                                                    const eqps = [...profile.equipment];
                                                    eqps[index] = newEquipment;
                                                    setProfile({ ...profile, equipment: eqps });
                                                    setEditModeEquipment(true);
                                                }
                                            }
                                        }
                                        }
                                        editMode={editModeEquipment}
                                        onChangeName={(e) => {
                                            if (profile?.equipment) {
                                                const equip = profile.equipment[index];
                                                if (equip) {
                                                    const newEquipment = { ...equip, name: e.target.value };
                                                    const eqps = [...profile.equipment];
                                                    eqps[index] = newEquipment;
                                                    setProfile({ ...profile, equipment: eqps });
                                                }
                                            }
                                        }}
                                        onChangeType={(e) => {
                                            if (profile?.equipment) {
                                                const equip = profile.equipment[index];
                                                if (equip) {
                                                    const newEquipment = { ...equip, type: e.target.value as IEquipment['type'] };
                                                    const eqps = [...profile.equipment];
                                                    eqps[index] = newEquipment;
                                                    setProfile({ ...profile, equipment: eqps });
                                                }
                                            }
                                        }}
                                        deleteEquipment={() => {
                                            if (profile?.equipment) {
                                                const equip = profile.equipment[index];
                                                if (equip) {
                                                    const eqps = [...profile.equipment];
                                                    eqps.splice(index, 1);
                                                    setProfile({ ...profile, equipment: eqps });
                                                    setEditModeEquipment(true);
                                                }
                                            }
                                        }}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            {showFolderCreateUpdate && <FolderCreateUpdate
                onClose={handleFolderCreateUpdateClose}
                folderId={folders[selectedFolder]?.id}
            />}
            {isLoading && <CameraSpinnerModal />}
        </>
    );
};

export default UserSettings;