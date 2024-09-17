import { IUserFolder } from "../interfaces/folder.interface";
import { IPhotoOfTheDay } from "../interfaces/photo-of-the-day.interface";
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

export const apiFetchGalleryByFolderId = async (id: string, type: 'preview' | 'original' | 'compressed') => {
    return apiClient.get<IPhoto[]>(`/photos/${id}/${type}`).then((response) => {
        if (response.status !== 200) {
            throw new Error('Failed to get folders');
        }
        return response.data;
    }).catch(error => {
        throw error;
    });
};

export const apiUpdateFolderById = async (id: string, folder: Omit<IUserFolder, 'id'>) => {
    return apiClient.put<IUserFolder>(`/folders/${id}`, folder).then((response) => {
        if (response?.status !== 200) {
            throw new Error('Failed to get folders');
        }
        return response.data;
    }).catch(error => {
        throw error;
    });
};

export const apiCreateFolder = async (folder: Omit<IUserFolder, 'id'>) => {
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

export const apiFetchUserFolderByFolderId = async (id: string) => {
    return apiClient.get<IUserFolder>(`/folders/${id}`).then((response) => {
        if (response?.status !== 200) {
            throw new Error('Failed to get folders');
        }
        return response.data;
    }).catch(error => {
        console.error(error);
        throw error;
    });
};

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

export const apiUploadPhoto = async (formData: FormData, folderId: string) => {
    return apiClient.post<IPhoto>(`/photos/${folderId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => {
        if (response?.status !== 200) {
            throw new Error('Failed to get folders');
        }
        return response.data;
    }).catch(error => {
        console.error(error);
    });
};

export const apiDeletePhotoByIdAndFolderId = async (folderId: string, photoId: string) => {
    return apiClient.delete(`/photos/${folderId}/${photoId}`).then((response) => {
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

export const apiGetPhotoOfTheDay = async (): Promise<IPhotoOfTheDay> => {
    return apiClient.get<IPhotoOfTheDay>(`/public/photos/photo-of-the-day`).then((response) => {
        if (response?.status !== 200) {
            throw new Error('Failed to get photo');
        }
        return response.data as IPhotoOfTheDay;
    }).catch(error => {
        console.error(error);
        throw error;
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

export const apiFetchFoldersByProfileId = async (profileId: string) => {
    return apiClient.get<IUserFolder[]>(`/public/folders/${profileId}`)
        .then((response) => {
            if (response?.status !== 200) {
                throw new Error('Failed to get folders');
            }
            return response.data;
        }).catch(error => {
            console.error(error);
            throw error;
        });
};

export const apiFetchUserProfile = async () => {
    return apiClient.get<IProfile>(`/profiles/me`).then((response) => {
        if (response?.status !== 200) {
            throw new Error('Failed to get user');
        }
        return response.data;
    }).catch(error => {
        console.error(error);
        throw error;
    });
}