import { IPhoto } from './photo.interface';
import { IProfile } from './profile.interface';

export interface IPhotoOfTheDay {
  photo: IPhoto;
  profile: IProfile;
}
