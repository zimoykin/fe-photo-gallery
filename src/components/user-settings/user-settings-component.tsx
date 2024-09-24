import React, { useEffect, useRef, useState } from 'react';
import './user-settings-style.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import UserEquipment from './user-equipment-component';
import CameraSpinnerModal from '../camera-spinner/camera-spinner-modal.component';
import Avatar from '../avatar/avatar-component';
import { useNavigate } from 'react-router-dom';
import { storeProfile } from '../../features/profile/profile-slice';
import { IProfile } from '../../interfaces/profile.interface';
import { IEquipment } from '../../interfaces/eqiupment.interface';
import { storeFolders } from '../../features/folders/folders-slice';
import { IFoldersAndTotal } from '../../interfaces/folder.interface';
import { ApiClient } from '../../api/networking/api-client';
import { toast } from 'react-toastify';
import UserFolder from './user-folder-component';

const UserSettings: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { profile: storedProfile } = useSelector((state: RootState) => state.profile);

  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [folders, setFolders] = useState<IFoldersAndTotal[]>([]);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editModeEquipment, setEditModeEquipment] = useState<boolean>(false);

  useEffect(() => {
    if (storedProfile) setProfile(storedProfile);
  }, [storedProfile]);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);

      ApiClient.get<IProfile>('/profiles/me')
        .then((profile) => {
          dispatch(storeProfile(profile));
          setProfile(profile);
          ApiClient.get<IFoldersAndTotal[]>(`/folders`)
            .then((resp) => {
              if (resp) {
                dispatch(storeFolders(resp));
                setFolders(resp);
              }
            })
            .catch((error) => {
              toast.error(error);
              console.log(error);
            });
        })
        .finally(() => setIsLoading(false))
        .catch((err) => {
          toast.error(err);
        });
    } else {
      navigate('/home');
    }
  }, [isAuthenticated, dispatch, navigate, profile?.id]);

  const handleClickCreateFolder = () => {
    setFolders((fld) => {
      return [
        ...fld,
        {
          title: '',
          profileId: profile?.id ?? '',
          sortOrder: fld.length + 1,
          color: '#fff',
          bgColor: '#000',
          description: '',
          id: '',
          totalPhotos: 0
        }
      ];
    });
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
      ApiClient.put<IProfile>('/profiles', profile)
        .finally(() => setIsLoading(false))
        .then((resp) => {
          dispatch(storeProfile(resp));
          setEditMode(false);
          setProfile(resp);
        });
    }
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      setIsLoading(true);
      ApiClient.postUpload('/profiles/photo/upload', formData)
        .finally(() => setIsLoading(false))
        .then(() => {
          toast.success('Avatar updated');
          setIsLoading(true);
          ApiClient.get<IProfile>('/profiles/me')
            .then((profile) => {
              dispatch(storeProfile(profile));
              setProfile(profile);
            })
            .finally(() => setIsLoading(false));
        });
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        onChange={handleFileChange}
        type="file"
        style={{ display: 'none' }}
        id="avatar-input"
        accept="image/*"
      />
      <div className="user-settings-container  shadow">
        <div className="user-settings-box">
          <div className="user-info-container global-background-layer">
            <Avatar onClick={handleAvatarClick} url={profile?.url ?? 'ava-mock.jpg'} />
            <div className="user-info-user-data">
              <div className="scale-s flex-row flex-center p-2">
                {editMode ? (
                  <input
                    className="global-input w-80"
                    onChange={(e) => {
                      if (profile) setProfile({ ...profile, name: e.target.value });
                    }}
                    type="text"
                    defaultValue={profile?.name}
                  />
                ) : (
                  <div className="flex-row flex-center w-100">
                    <h1>{profile?.name}</h1>
                    <i className="fas fa-edit p-3" onClick={() => setEditMode(!editMode)} />
                  </div>
                )}
              </div>

              {editMode ? (
                <input
                  className="global-input w-80"
                  placeholder="contact email"
                  type="email"
                  defaultValue={profile?.email}
                  onChange={(e) => {
                    if (profile) setProfile({ ...profile, email: e.target.value });
                  }}
                />
              ) : (
                <div className="flex-row flex-center scale-s p-2">
                  <i className="p-2 user-settings-icon fas fa-envelope" />
                  <span
                    onClick={() => {
                      if (profile?.email) window.location.href = `mailto:${profile?.email}`;
                    }}
                  >
                    {profile?.email ?? '! no email provided'}
                  </span>
                </div>
              )}

              {editMode ? (
                <input
                  className="global-input w-80"
                  placeholder="location"
                  type="text"
                  defaultValue={profile?.location}
                  onChange={(e) => {
                    if (profile) setProfile({ ...profile, location: e.target.value });
                  }}
                />
              ) : (
                <div className="flex-row scale-s">
                  <i className="p-2 user-settings-icon fas fa-map-marker-alt" />
                  <span className="p-2">{profile?.location ?? '! no location provided'} </span>
                </div>
              )}

              {editMode ? (
                <select
                  onChange={(e) => {
                    if (profile) {
                      setProfile({ ...profile, privateAccess: Number(e.target.value) });
                    }
                  }}
                  className="global-input w-80"
                  name="privateAccess"
                  id="privateAccess"
                >
                  <option value="1">private</option>
                  <option value="0">public</option>
                </select>
              ) : (
                <div className="scale-s flex-row flex-center">
                  <i className="p-2 fas fa-globe" />
                  <span>{profile?.privateAccess ? 'private' : 'public'}</span>
                </div>
              )}

              {!editMode && (
                <span>
                  {profile?.equipment?.find((e) => e.type === 'camera' && e.favorite)?.name ??
                    '! no main camera provided'}{' '}
                </span>
              )}
              {!editMode && (
                <span>
                  {profile?.equipment?.find((e) => e.type === 'lens' && e.favorite)?.name ??
                    '! no main lens provided'}{' '}
                </span>
              )}
              {editMode ? (
                <input
                  className="global-input w-80"
                  placeholder="website"
                  type="text"
                  defaultValue={profile?.website}
                />
              ) : (
                <span>{profile?.website ?? '! no website provided'}</span>
              )}

              {editMode && (
                <textarea
                  className="global-input w-80"
                  placeholder="bio"
                  defaultValue={profile?.bio}
                />
              )}
              {editMode && (
                <div className="flex-space-between w-80">
                  <div className="flex p-1 w-100 p-1 gap">
                    <button
                      className="global-button primary p-10 shadow scale-s"
                      onClick={handleSaveProfileClick}
                    >
                      save
                    </button>

                    <button
                      className="global-button danger p-10 shadow scale-s"
                      onClick={handleCancelEditProfileClick}
                    >
                      cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="user-folders-equipment-container">
            <div className="user-folders-equipment-container-box ">
              <div className="table-command-panel">
                <div className="hover-bg scale-l">
                  <i className="fa-solid fa-plus" onClick={handleClickCreateFolder} />
                </div>
              </div>
              <div className="table">
                {[...folders]?.map((folder, index) => <UserFolder key={index} folder={folder} />)}
              </div>
            </div>
            <div className="user-folders-equipment-container-box">
              <div className="table-command-panel gap">
                <i
                  className="hover-bg scale-l fa-solid fa-plus"
                  onClick={() => {
                    if (profile) {
                      setProfile({
                        ...profile,
                        equipment: [
                          ...(profile?.equipment ?? []),
                          {
                            type: 'camera',
                            name: `Camera ${(profile.equipment?.filter((e) => e.type === 'camera') ?? []).length + 1}`,
                            favorite: false
                          }
                        ]
                      });
                      setEditModeEquipment(true);
                    }
                  }}
                />

                {!editModeEquipment && (
                  <i
                    className="hover-bg scale-l fa-solid fa-pen"
                    onClick={() => setEditModeEquipment(true)}
                  />
                )}

                {editModeEquipment && (
                  <i
                    className="p-2 fas fa-save palitra-4 scale-l"
                    onClick={() => {
                      setEditModeEquipment(false);
                      handleSaveProfileClick();
                    }}
                  />
                )}
                {editModeEquipment && (
                  <i
                    className="p-2 fas fas fa-history palitra-1 scale-l"
                    onClick={() => {
                      setEditModeEquipment(false);
                      handleCancelEditProfileClick();
                    }}
                  />
                )}
              </div>
              {[...(profile?.equipment ?? [])].map((eq, index) => (
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
                  }}
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
                        const newEquipment = {
                          ...equip,
                          type: e.target.value as IEquipment['type']
                        };
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
              ))}
            </div>
          </div>
        </div>
      </div>
      {isLoading && <CameraSpinnerModal />}
    </>
  );
};

export default UserSettings;
