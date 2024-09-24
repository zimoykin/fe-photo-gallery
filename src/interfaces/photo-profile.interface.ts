import { IPhoto } from "./photo.interface";
import { IProfile } from "./profile.interface";

export interface IPublicPhoto {
    photo: IPhoto;
    profile: IProfile;
}
