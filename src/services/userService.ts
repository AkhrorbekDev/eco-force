// src/services/userService.js
import {createAuthenticatedApi} from './api';

export const createUserService = (token) => {
    const authApi = createAuthenticatedApi(token);

    return {
        // Get user details
        getUserDetails: () => authApi('/get-user-details/'),

        // Update promo code
        updatePromoCode: (code) => authApi('/update-promo-code/', {
            method: 'PUT',
            body: {code},
        }),

        // Use promo code
        usePromoCode: (code) => authApi('/use-promo-code/', {
            method: 'POST',
            body: {code},
        }),

        // Generate API key
        generateApiKey: () => authApi('/generate-api-key/'),

        // Get referral stats
        getReferralStats: () => authApi('/referral-stats/'),
    };
};
