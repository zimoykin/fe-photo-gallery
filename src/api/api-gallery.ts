import apiClient from "./api-gallery-client";

export interface IUserFolder {
    id: string;
    title: string;
    bgColor: string;
    color: string;
    description: string;
    sortOrder: number;
}

export interface IPhoto {
    id: string;
    iso?: string;
    sortOrder: number;
    description?: string;
    location?: string;
    film?: string;
    camera?: string;
    lens?: string;
    userId: string;
    folderId: string;
    url: string;
}

export const apiFetchUserFolders = async () => {
    return apiClient.get<IUserFolder[]>('/folder')
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

export const apiFetchGalleryByFolderId = async (id: string) => {
    return apiClient.get<IPhoto[]>(`/photo/${id}`).then((response) => {
        if (response.status !== 200) {
            throw new Error('Failed to get folders');
        }
        return response.data;
    }).catch(error => {
        throw error;
    });
};

export const apiUpdateFolderById = async (id: string, folder: Omit<IUserFolder, 'id'>) => {
    return apiClient.put<IUserFolder>(`/folder/${id}`, folder).then((response) => {
        if (response?.status !== 200) {
            throw new Error('Failed to get folders');
        }
        return response.data;
    }).catch(error => {
        throw error;
    });
};

export const apiCreateFolder = async (folder: Omit<IUserFolder, 'id'>) => {
    return apiClient.post<IUserFolder>('/folder', folder)
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