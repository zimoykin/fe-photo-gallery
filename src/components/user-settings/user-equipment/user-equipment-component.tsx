
import React, { useEffect, useState } from 'react';
import './user-equipment-style.css';
import CameraSpinnerModal from '../../camera-spinner/camera-spinner-modal.component';

interface IUserEquipment {
    id: string;
    camera?: string;
    lens?: string;
}

const UserEquipment: React.FC = () => {

    const [equipment, setEquipment] = useState<IUserEquipment[]>([{
        id: '1',
        camera: 'Canon EOS 6D',
    }, {
        id: '2',
        lens: 'Canon EF 35mm f/1.2L',
    }, {
        id: '3',
        lens: 'Canon EF 35-80mm f/3.5-5.6L USM',
    }]);

    const [favoriteCamera, setFavoriteCamera] = useState<string>();
    const [favoriteLens, setFavoriteLens] = useState<string>();


    const [userEquipment, setUserEquipment] = useState<IUserEquipment[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (equipment) {
            setUserEquipment(equipment);
        }
    }, [equipment]);


    const handleEquipmentRemoveClick = (equipmentId: string) => {
        setIsLoading(true);
        setTimeout(() => {
            setEquipment(equipment.filter(equip => equip.id !== equipmentId));
            setIsLoading(false);
        }, 3000);
    };


    const handleEquipmentStarClick = ({ camera, lens, id }: IUserEquipment) => {
        if (camera) {
            setFavoriteCamera(id);
        } else if (lens) {
            setFavoriteLens(id);
        }
    };

    return (
        <div>
            <div className='user-equipment-command-panel' >
                <i className="user-equipment-icon fa-solid fa-plus" />
                {/* <i className="user-equipment-icon fas fa-image" /> */}
            </div>
            <div className='user-equipment-table'>
                {userEquipment.map((equip, index) => (
                    <div className='user-equipment-equipment-line'
                        key={index}
                    >
                        <div className='user-equipment-equipment-title'>
                            <h3>{equip.camera ?? equip.lens}</h3>
                        </div>
                        <div className='user-equipment-equipment-comannd'>
                            <i className="user-equipment-icon fas fa-star"
                                onClick={() => {
                                    handleEquipmentStarClick({
                                        id: equip.id,
                                        camera: equip.camera,
                                        lens: equip.lens
                                    });
                                }}
                                style={(favoriteCamera === equip.id || favoriteLens === equip.id) ? { color: 'yellow' } : {}}
                            />
                            <i className="user-equipment-icon fas fa-trash"
                                onClick={() => handleEquipmentRemoveClick(equip.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            {isLoading && <CameraSpinnerModal />}
        </div>
    );
};
export default UserEquipment;