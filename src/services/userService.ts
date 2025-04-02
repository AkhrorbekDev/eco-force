// src/services/userService.js
import {api} from './api';

export const createUserService = () => {
    const authApi = api;
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
        getReferrals: (query) => authApi('/referral-earnings/', {
            method: 'GET',
            params: query,
        })
    };
};
