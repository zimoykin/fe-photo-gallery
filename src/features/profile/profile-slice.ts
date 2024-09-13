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
        setUserProfile: (state, action: PayloadAction<ProfileState['user']>) => {
            state.user = action.payload;
        },
        clearUserProfile: (state) => {
            state.user = null;
        },
    },
});

export const { setUserProfile, clearUserProfile } = profileSlice.actions;
export default profileSlice.reducer;
