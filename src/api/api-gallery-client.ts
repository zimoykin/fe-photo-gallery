import axios, { AxiosError, AxiosResponse } from 'axios';
import store, { RootState } from '../store';
import apiClientAuth from './api-auth-client';
import { login, logout } from '../features/auth/auth-slice';
const { REACT_APP_API_URL } = process.env;

const apiClient = axios.create({
    baseURL: REACT_APP_API_URL,
});

// Add a request interceptor to include the token in headers
apiClient.interceptors.request.use(
    (config) => {
        const state: RootState = store.getState();
        const token = state.auth.accessToken;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    // eslint-disable-next-line
    async (error: AxiosError<any, any>) => {
        // eslint-disable-next-line
        const { config, response } = error as any; //TODO: fix type
        if ((response?.status === 401 || response?.status === 403) && !config._retry) {
            config._retry = true;
            const state: RootState = store.getState();
            const refreshToken = state.auth.refreshToken;
            try {
                const refreshResponse = await apiClientAuth.post('auth/refresh', { refreshToken });
                const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data;
                store.dispatch(
                    login([accessToken, newRefreshToken])
                );
                config.headers.Authorization = `Bearer ${accessToken}`;
                return apiClient(config);
            } catch (error) {
                console.error('Failed to refresh token', error);
                store.dispatch(logout());
            }
        }

    }
);

export default apiClient;
