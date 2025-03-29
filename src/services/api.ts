// src/services/api.js
import { ofetch } from 'ofetch';

// Create base API instance with common configuration
const createApiInstance = (config = {}) => {
    return ofetch.create({
        baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include', // Sends cookies with cross-origin requests
        mode: 'cors', // Enables CORS requests
        ...config,
    });
};

// API instance without authentication
const api = createApiInstance();

// API instance with authentication
const createAuthenticatedApi = (token) => {
    return createApiInstance({
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

export { api, createAuthenticatedApi };
