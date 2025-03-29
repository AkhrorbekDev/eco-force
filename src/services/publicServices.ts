// services/api.js
import {ofetch} from 'ofetch'

// Create a base API instance with common configuration
const api = ofetch.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
        'Content-Security-Policy': 'default-src https: http:'
    },
    credentials: 'include', // Sends cookies with cross-origin requests
    mode: 'cors', // Enables CORS requests
    async onRequest({request, options}) {
        // Get auth token from local storage if available
        const token = localStorage.getItem('auth_token')
        if (token) {
            options.headers = options.headers || {}
            options.headers.Authorization = `Bearer ${token}`
        }
    },
    async onResponseError({request, response, options}) {
        // Handle error responses
        console.error('API Error:', response.status, response._data)
    }
})

/**
 * Energy service - handles energy pricing and calculations
 */
export const energyService = {
    /**
     * Get information about energy pricing
     * @returns {Promise<Object>} Energy pricing information
     */
    getEnergyPricing() {
        return api('/energy-pricing')
    },

    /**
     * Calculate energy cost for specific address
     * @param {string} delegationAddress - The TRON delegation address
     * @returns {Promise<Object>} Energy cost calculation
     */
    getEnergyCostPerAddress(delegationAddress) {
        return api('/energy-cost-per-address/', {
            method: 'POST',
            body: {delegation_address: delegationAddress}
        })
    }
}

/**
 * Address service - handles TRON address operations
 */
export const addressService = {
    /**
     * Check if a TRON address is activated
     * @param {string} delegationAddress - The TRON address to check
     * @returns {Promise<Object>} Address activation status
     */
    checkAddressActivation(delegationAddress) {
        return api('/check-activation-tron-address/', {
            method: 'POST',
            body: {delegation_address: delegationAddress}
        })
    }
}

/**
 * Order service - handles order creation and retrieval
 */
export const orderService = {
    /**
     * Create a new energy delegation order
     * @param {string} delegationAddress - The TRON delegation address
     * @param {number} energyAmount - Amount of energy to delegate
     * @returns {Promise<Object>} Created order details
     */
    createOrder(delegationAddress, energyAmount) {
        return api('/create-order/', {
            method: 'POST',
            body: {
                delegation_address: delegationAddress,
                energy_amount: energyAmount
            }
        })
    },

    /**
     * Get information about an existing order
     * @param {string} orderId - Unique order identifier
     * @returns {Promise<Object>} Order details
     */
    getOrderInfo(orderId) {
        return api('/unauthorized-user-order/', {
            method: 'POST',
            body: {order_id: orderId}
        })
    }
}

/**
 * Auth service - handles authentication
 */
export const authService = {
    /**
     * Obtain authentication token using session ID
     * @param {string} sessionId - User session identifier
     * @returns {Promise<Object>} Authentication token
     */
    obtainToken(sessionId) {
        return api('/obtain-token/', {
            method: 'POST',
            body: {session_id: sessionId}
        })
    },

    /**
     * Store authentication token in local storage
     * @param {string} token - Authentication token to store
     */
    setToken(token) {
        localStorage.setItem('auth_token', token)
    },

    /**
     * Remove authentication token from local storage
     */
    clearToken() {
        localStorage.removeItem('auth_token')
    },

    /**
     * Check if user is authenticated
     * @returns {boolean} True if authenticated
     */
    isAuthenticated() {
        return !!localStorage.getItem('auth_token')
    }
}

// Export all services
export default {
    energy: energyService,
    address: addressService,
    order: orderService,
    auth: authService
}
