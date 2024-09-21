import { Axios, AxiosRequestConfig } from "axios";
import apiClient from "../api-gallery-client";

export class ApiClient {
    static instance: ApiClient;
    axiosInstance: Axios;

    constructor() {
        this.axiosInstance = apiClient;
    }

    static init = () => {
        if (!ApiClient.instance) {
            this.instance = new ApiClient();
        }
        return ApiClient.instance;
    };

    static async get<T>(
        path: string,
        config?: AxiosRequestConfig
    ) {
        const response = await ApiClient.init().axiosInstance.get<T>(path, config).catch(error => {
            console.error(error);
            throw error.message ?? 'an error';
        });
        if (response?.status !== 200) {
            console.error(response?.statusText);
            throw new Error(response?.statusText);
        }
        else if (response.data) {
            return response.data;
        } else {
            throw new Error('No data returned');
        }
    }

    static async post<T>(path: string, data?: unknown, config?: AxiosRequestConfig) {
        const response = await ApiClient.init().axiosInstance.post<T>(path, data, config).catch(error => {
            console.error(error);
            throw error.message ?? 'an error';
        });
        if (response.status !== 200) {
            console.error(response.statusText);
            throw new Error(response.statusText);
        }
        else {
            return response.data;
        }
    }
    static async put<T>(path: string, data: unknown, config?: AxiosRequestConfig) {
        const response = await ApiClient.init().axiosInstance.put<T>(path, data, config).catch(error => {
            console.error(error);
            throw error.message ?? 'an error';
        });
        if (response.status !== 200) {
            console.error(response.statusText);
            throw new Error(response.statusText);
        }
        else {
            return response.data;
        }
    }
    static async patch<T>(path: string, data: unknown, config?: AxiosRequestConfig) {
        const response = await ApiClient.init().axiosInstance.patch<T>(path, data, config).catch(error => {
            console.error(error);
            throw error.message ?? 'an error';
        });
        if (response.status !== 200) {
            console.error(response.statusText);
            throw new Error(response.statusText);
        }
        else {
            return response.data;
        }
    }
    static async delete<T>(patch: string, config?: AxiosRequestConfig) {
        const response = await ApiClient.init().axiosInstance.delete<T>(patch, config)
            .catch(error => {
                console.error(error);
                throw error.message ?? 'an error';
            });
        if (response.status !== 200) {
            console.error(response.statusText);
            throw new Error(response.statusText);
        }
        else {
            return response.data;
        }
    }

    static async postUpload<T>(path: string, data: FormData, config?: AxiosRequestConfig) {
        const response = await ApiClient.init().axiosInstance.post<T>(path, data, {
            ...config,
            headers: {
                ...config?.headers,
                'Content-Type': 'multipart/form-data'
            }
        }).catch(error => {
            console.error(error);
            throw error.message ?? 'an error';
        });
        if (response?.status !== 200) {
            console.error(response?.statusText);
            throw new Error();
        }
        else {
            return response?.data;
        }
    }
}