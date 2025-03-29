// src/services/walletService.js
import { createAuthenticatedApi } from './api';

export const createWalletService = (token) => {
    const authApi = createAuthenticatedApi(token);

    return {
        // Request address for adding funds
        requestAddress: () => authApi('/request-address/'),

        // Withdraw TRX from balance
        withdrawFunds: (amount, walletAddress) => authApi('/withdraw/', {
            method: 'POST',
            body: { amount, wallet_address: walletAddress },
        }),

        // Confirm withdrawal
        confirmWithdrawal: (withdrawalRequestId, confirmationCode) => authApi('/withdraw/confirm/', {
            method: 'POST',
            body: { withdrawal_request_id: withdrawalRequestId, confirmation_code: confirmationCode },
        }),

        // Resend confirmation code
        resendWithdrawalCode: (withdrawalRequestId) => authApi('/withdraw/resend-code/', {
            method: 'POST',
            body: { withdrawal_request_id: withdrawalRequestId },
        }),
    };
};
