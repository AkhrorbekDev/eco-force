// src/services/authService.js
import { api, createAuthenticatedApi } from './api';

export const authService = {
    // Get session ID
    getSessionId: () => api('/generate-session-id/'),

    // Refresh token
    refreshToken: (refreshToken) => api('/token-refresh/', {
        method: 'POST',
        body: { refresh: refreshToken },
    }),
};
