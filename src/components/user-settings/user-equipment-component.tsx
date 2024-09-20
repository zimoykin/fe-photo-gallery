
import React from 'react';
import { IEquipment } from '../../interfaces/eqiupment.interface';

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
            <div className='table'>
                <div className='table-line shadow scale-s'
                >
                    <div className='flex-center align-left p-10 w-70'>
                        {editMode ? <input
                            className='global-input w-80 p-10' type="text" defaultValue={equipment.name}
                            onChange={onChangeName}
                        />
                            : <span>{equipment.name}</span>}
                    </div>

                    <div className='flex-center align-left p-10 w-70'>
                        {editMode ?
                            <select className='global-input w-100' name="type" id="type" defaultValue={equipment.type}

                                onChange={onChangeType}>
                                <option value="camera">camera</option>
                                <option value="lens">lens</option>
                                <option value="other">other</option>
                            </select>
                            : <span>{equipment.type}</span>}
                    </div>

                    <div className='flex-cente align-right p-10 w-30'>
                        <i className="scale-l hover-bg p-2  fas fa-star"
                            onClick={addStar}
                            style={(equipment.favorite) ? { color: 'yellow' } : {}}
                        />
                        <i className="scale-l hover-bg p-2  fas fa-trash"
                            onClick={deleteEquipment}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UserEquipment;