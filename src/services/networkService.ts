// src/services/networkService.js
import { api } from './api';

export const networkService = {
    // Get TRON network stats
    getTronNetworkStats: () => api('/tron-network-stats/'),
};
