import { IEquipment } from "./eqiupment.interface";

export interface IProfile {
    id: string;
    userId: string;
    name?: string;
    location?: string;
    bio?: string;
    website?: string;
    privateAccess: boolean;
    equipment?: IEquipment[];
    url?: string;

    email: string;
};