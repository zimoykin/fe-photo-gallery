import { IEquipment } from "./eqiupment.interface";

export interface IProfile {
    id: string;
    userId?: string;
    email?: string;
    location?: string;
    bio?: string;
    name?: string;
    website?: string;
    url?: string;
    equipment?: IEquipment[];

    privateAccess?: boolean;
};