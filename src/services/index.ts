// src/services/api.js
import { ofetch } from 'ofetch';

// Create base API instance with common configuration
const createApiInstance = (config = {}) => {
    return ofetch.create({
        baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        ...config,
    });
};

// API instance without authentication
const api = createApiInstance();// src/services/index.js
import { api, createAuthenticatedApi } from './api';
import { authService } from './authService';
import { createUserService } from './userService';
import { createWalletService } from './walletService';
import { createEnergyService } from './energyService';
import { createStakingService } from './stakingService';
import { networkService } from './networkService';

export {
    api,
    createAuthenticatedApi,
    authService,
    createUserService,
    createWalletService,
    createEnergyService,
    createStakingService,
    networkService,
};

// API instance with authentication
const createAuthenticatedApi = (token) => {
    return createApiInstance({
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

export { api, createAuthenticatedApi };
