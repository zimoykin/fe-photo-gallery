import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserFolder } from '../../api/api-gallery';

interface FoldersState {
    folders: IUserFolder[];
    updatedAt: number | null;
}

const initialState: FoldersState = {
    folders: [],
    updatedAt: null
};

const foldersSlice = createSlice({
    name: '_folders',
    initialState,
    reducers: {
        storeFolders: (state, action: PayloadAction<IUserFolder[]>) => {
            state.folders = action.payload;
            state.updatedAt = new Date().getTime();
        },
        dropFolders: (state) => {
            state.folders = [];
            state.updatedAt = null;
        },
    },
});

export const { storeFolders, dropFolders } = foldersSlice.actions;

export default foldersSlice.reducer;
