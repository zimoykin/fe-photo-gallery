import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<[string, string]>) => {
      console.log(action.payload);
      state.isAuthenticated = true;
      const [accessToken, refreshToken] = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logout: (state) => {
      console.log(state);
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});


export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
