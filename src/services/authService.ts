// src/services/authService.js
import {generateSessionId, clearSessionId, getSessionId} from './sessionService'
import {obtainToken, getAuthToken, clearTokens} from './tokenService'

/**
 * Initialize authentication: generate session ID and obtain tokens
 * @returns {Promise<boolean>} - Success status
 */
export const initializeAuth = async () => {
    // First generate and save a session ID
    const sessionId = await getSessionId()
    if (!sessionId) {
        console.error('Failed to generate session ID')
        return false
    }

    // Then obtain tokens using that session ID
    return await obtainToken()
}

/**
 * Check if the user is authenticated
 * @returns {boolean} - Authentication status
 */

export const isAuthenticated = () => {
    return !!getAuthToken()
}

/**
 * Logout the user by removing the tokens and session ID
 */
export const logout = () => {
    clearTokens()
    clearSessionId()
}

export default {
    initializeAuth,
    isAuthenticated,
    logout
}
