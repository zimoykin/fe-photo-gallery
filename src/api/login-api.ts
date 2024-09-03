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