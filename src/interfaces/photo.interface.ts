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