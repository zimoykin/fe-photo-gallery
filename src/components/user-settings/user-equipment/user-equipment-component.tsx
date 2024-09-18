
import React from 'react';
import './user-equipment-style.css';
import { IEquipment } from '../../../interfaces/eqiupment.interface';

interface Props {
    equipment: IEquipment;
    editMode: boolean;
    addStar: () => void;
    deleteEquipment: () => void;

    onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeType: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const UserEquipment: React.FC<Props> = ({ equipment, addStar, deleteEquipment, editMode, onChangeName, onChangeType }) => {

    return (
        <div>
            <div className='user-equipment-table'>

                <div className='user-equipment-equipment-line global-secondary-background-layer shadow scale-s'
                >
                    <div className='user-equipment-equipment-title p-10'>
                        {editMode ? <input
                            className='global-input w-80 p-10' type="text" defaultValue={equipment.name}
                            onChange={onChangeName}
                        />
                            : <h3>{equipment.name}</h3>}
                    </div>

                    <div className='user-equipment-equipment-title p-10'>
                        {editMode ?
                            <select className='global-input w-100' name="type" id="type" defaultValue={equipment.type}

                                onChange={onChangeType}>
                                <option value="camera">camera</option>
                                <option value="lens">lens</option>
                                <option value="other">other</option>
                            </select>
                            : <h3>{equipment.type}</h3>}
                    </div>

                    <div className='user-equipment-equipment-comannd  p-10'>
                        <i className="user-equipment-icon fas fa-star p-10"
                            onClick={addStar}
                            style={(equipment.favorite) ? { color: 'yellow' } : {}}
                        />
                        <i className="user-equipment-icon fas fa-trash"
                            onClick={deleteEquipment}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UserEquipment;