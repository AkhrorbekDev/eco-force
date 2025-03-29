// src/services/stakingService.js
import { createAuthenticatedApi } from './api';

export const createStakingService = (token) => {
    const authApi = createAuthenticatedApi(token);

    return {
        // Get staking summary
        getStakingSummary: () => authApi('/staking-summary/'),

        // Stake funds
        stakeAmount: (amount) => authApi('/stake/', {
            method: 'POST',
            body: { amount },
        }),

        // Unstake funds
        unstakeAmount: (amount) => authApi('/unstake/', {
            method: 'POST',
            body: { amount },
        }),

        // Get staking action history
        getStakingActions: () => authApi('/staking-actions/'),
    };
};
