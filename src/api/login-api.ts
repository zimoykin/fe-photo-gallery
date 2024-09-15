import api from './api-auth-client';

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export const apilogin = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', {
        email, password
    });
    if (response.status !== 200) {
        throw new Error('Failed to login');
    } else
        return response.data as LoginResponse;
};

export const apiRegister = async (email: string, password: string, name: string) => {
    const response = await api.post('/auth/register', {
        email, password, name, url: 'https://photo.gallery.io'
    });
    if (response.status !== 200) {
        throw new Error('Failed to register');
    } else {
        return response.data;
    }
};

export const apiConfirmation = async (token: string, code: string) => {
    const response = await api.post('/auth/confirm', { token, code });
    if (response.status !== 200) {
        throw new Error('Failed to confirm');
    } else
        return response.data;
};

export const apiRecovery = async (email: string) => {
    const response = await api.post('/recovery/start-process', { email });
    if (response.status !== 200) {
        throw new Error('Failed to recovery');
    } else
        return response.data;
};

export const apiMe = async () => {
    const response = await api.get('/auth/me');
    if (response.status !== 200) {
        throw new Error('Failed to get user');
    } else
        return response.data;
}; 