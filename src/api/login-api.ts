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

export const apiMe = async () => {
    const response = await api.get('/auth/me');
    if (response.status !== 200) {
        throw new Error('Failed to get user');
    } else
        return response.data;
}; 