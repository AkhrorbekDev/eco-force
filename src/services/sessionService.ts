import {ofetch} from 'ofetch'
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL || '/api'
export const SESSION_ID_KEY = 'session_id'

/**
 * Generate a new session ID from the API and save it to SessionStorage
 * @returns {Promise<string|null>} - The generated session ID or null on failure
 */
export const generateSessionId = async () => {
    try {
        const response = await ofetch(`${API_URL}/generate-session-id/`, {
            method: 'GET'
        })

        if (response && response.session_id) {
            // Save the session ID to SessionStorage
            if (response?.session_id) {
                Cookies.set(SESSION_ID_KEY, response.session_id, {
                    path: '/',
                    expires: 1 / 144
                }); // 10 minutes expiration
            }
            return response.session_id
        }
        return null
    } catch (error) {
        console.error('Error generating session ID:', error)
        return null
    }
}

/**
 * Get the session ID from SessionStorage
 * @returns {string|null} - The session ID or null if not found
 */
export const getSessionId = () => {
    return Cookies.get(SESSION_ID_KEY)
}

/**
 * Remove the session ID from SessionStorage
 */
export const clearSessionId = () => {
    Cookies.remove(SESSION_ID_KEY)
}

export default {
    generateSessionId,
    getSessionId,
    clearSessionId
}
