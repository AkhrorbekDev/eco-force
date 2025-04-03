// src/services/walletService.js
import { createAuthenticatedApi } from './api';

export const createWalletService = (token) => {
    const authApi = createAuthenticatedApi(token);

    return {
        // Request address for adding funds
        requestAddress: () => authApi('/request-address/'),

        // Withdraw TRX from balance
        withdrawFunds: (options = {amount: 0, walletAddress: ''}) => authApi('/withdraw/', {
            method: 'POST',
            body: { ...options},
        }),

        // Confirm withdrawal
        confirmWithdrawal: (options = {withdrawalRequestId: '', confirmationCode: ''}) => authApi('/withdraw/confirm/', {
            method: 'POST',
            body: options,
        }),

        // Resend confirmation code
        resendWithdrawalCode: (withdrawalRequestId) => authApi('/withdraw/resend-code/', {
            method: 'POST',
            body: { withdrawal_request_id: withdrawalRequestId },
        }),
    };
};
