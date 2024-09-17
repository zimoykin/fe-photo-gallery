import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
    user: {
        id: string;
        email: string;
        name: string;
        image?: string;
        camera?: string;
        lens?: string;
    } | null;
}

const initialState: ProfileState = {
    user: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        storeProfile: (state, action: PayloadAction<ProfileState['user']>) => {
            state.user = action.payload;
        },
        dropProfile: (state) => {
            state.user = null;
        },
    },
});

export const { storeProfile, dropProfile } = profileSlice.actions;
export default profileSlice.reducer;
