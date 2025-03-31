// src/services/energyService.js
import {api, createAuthenticatedApi} from './api';

export const createEnergyService = () => {
    const authApi = api;

    return {
        // Sell energy
        sellEnergy: (energyAmount) => authApi('/sell-energy/', {
            method: 'POST',
            body: {energy_amount: energyAmount},
        }),

        // Create order (registered user)
        createOrder: (options = {delegation_address: '', energy_amount: 0, need_activate_address: false}) => authApi('/create-order/', {
            method: 'POST',
            body: options,
        }),

        // Confirm order execution
        confirmOrder: () => authApi('/confirm-order/', {
            method: 'POST',
        }),
        /**
         * Get information about energy pricing
         * @returns {Promise<Object>} Energy pricing information
         */
        getEnergyPricing() {
            return authApi('/energy-pricing/', {
                method: 'get',
            })
        },

        /**
         * Calculate energy cost for specific address
         * @param {string} delegationAddress - The TRON delegation address
         * @returns {Promise<Object>} Energy cost calculation
         */
        getEnergyCostPerAddress(delegationAddress) {
            return authApi('/energy-cost-per-address/', {
                method: 'POST',
                body: {delegation_address: delegationAddress}
            })
        },

        // Get user orders
        getUserOrders: () => authApi('/user-orders/'),
    };
};
