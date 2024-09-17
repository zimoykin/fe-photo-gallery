import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfile } from '../../interfaces/profile.interface';

interface ProfileState {
    profile?: IProfile | null;
}

const initialState: ProfileState = {
    profile: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        storeProfile: (state, action: PayloadAction<IProfile>) => {
            state.profile = action.payload;
        },
        dropProfile: (state) => {
            state.profile = null;
        },
    },
});

export const { storeProfile, dropProfile } = profileSlice.actions;
export default profileSlice.reducer;
