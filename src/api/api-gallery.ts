import { IFolder, IUserFolder } from "../interfaces/folder.interface";
import { IPhoto } from "../interfaces/photo.interface";
import { IProfile } from "../interfaces/profile.interface";
import apiClient from "./api-gallery-client";


export const apiFetchUserFolders = async (userId: string) => {
    return apiClient.get<IUserFolder[]>(`/folders`, { params: { userId } })
        .then((response) => {
            if (response?.status !== 200) {
                throw new Error('Failed to get folders');
            }
            return response.data;
        }).catch(error => {
            console.log(error);
            throw error;
        });
};

export const apiUpdateFolderById = async (id: string, folder: IFolder) => {
    return apiClient.put<IUserFolder>(`/folders/${id}`, folder).then((response) => {
        if (response?.status !== 200) {
            throw new Error('Failed to get folders');
        }
        return response.data;
    }).catch(error => {
        throw error;
    });
};

export const apiCreateFolder = async (folder: IFolder) => {
    return apiClient.post<IUserFolder>('/folders', folder)
        .then((response) => {
            if (response?.status !== 200) {
                throw new Error('Failed to get folders');
            }
            return response.data;
        }).catch(error => {
            console.error(error);
            return null;
        });
};

// export const apiFetchUserFolderByFolderId = async (id: string) => {
//     return apiClient.get<IUserFolder>(`/folders/${id}`).then((response) => {
//         if (response?.status !== 200) {
//             throw new Error('Failed to get folders');
//         }
//         return response.data;
//     }).catch(error => {
//         console.error(error);
//         throw error;
//     });
// };

export const apiDeleteFolderById = async (id: string) => {
    return apiClient.delete(`/folders/${id}`).then((response) => {
        if (response?.status !== 200) {
            throw new Error('Failed to get folders');
        }
        return response.data;
    }).catch(error => {
        console.error(error);
    });
};


export const apiFetchPhotoById = async (
    folderId: string,
    photoId: string
) => {
    return apiClient.get<IPhoto>(`/photos/${folderId}/${photoId}/compressed`).then((response) => {
        if (response?.status !== 200) {
            throw new Error('Failed to get photo');
        }
        return response.data;
    }).catch(error => {
        console.error(error);
    });
};


export const apiFetchUserProfileById = async (id: string) => {
    return apiClient.get<IProfile>(`/public/profiles/${id}`).then((response) => {
        if (response?.status !== 200) {
            throw new Error('Failed to get user');
        }
        return response.data;
    }).catch(error => {
        console.error(error);
        throw error;
    });
};