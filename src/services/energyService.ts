// src/services/energyService.js
import {createAuthenticatedApi} from './api';

export const createEnergyService = (token) => {
    const authApi = createAuthenticatedApi(token);

    return {
        // Sell energy
        sellEnergy: (energyAmount) => authApi('/sell-energy', {
            method: 'POST',
            body: {energy_amount: energyAmount},
        }),

        // Create order (registered user)
        createOrder: (delegationAddress, energyAmount) => authApi('/create-order', {
            method: 'POST',
            body: {delegation_address: delegationAddress, energy_amount: energyAmount},
        }),

        // Confirm order execution
        confirmOrder: () => authApi('/confirm-order', {
            method: 'POST',
        }),

        // Get user orders
        getUserOrders: () => authApi('/user-orders'),
    };
};
