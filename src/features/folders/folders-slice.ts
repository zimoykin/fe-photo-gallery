import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserFolder } from '../../interfaces/folder.interface';

interface FoldersState {
    folders: Record<string, IUserFolder>;
    updatedAt: number | null;
}

const initialState: FoldersState = {
    folders: {},
    updatedAt: null
};

const foldersSlice = createSlice({
    name: 'user_folders',
    initialState,
    reducers: {
        storeFolders: (state, action: PayloadAction<IUserFolder[]>) => {
            state.folders = action.payload.reduce((acc: Record<string, IUserFolder>, cu) => {
                acc[cu.id] = cu;
                return acc;
            }, {});
            state.updatedAt = new Date().getTime();
        },
        dropFolders: (state) => {
            state.folders = {};
            state.updatedAt = null;
        },
        appendFolders: (state, ...action: Array<PayloadAction<IUserFolder>>) => {
            action.forEach(({ payload }) => {
                state.folders[payload.id] = payload;
            });
            state.updatedAt = new Date().getTime();
        }
    },
});

export const { storeFolders, dropFolders, appendFolders } = foldersSlice.actions;

export default foldersSlice.reducer;
