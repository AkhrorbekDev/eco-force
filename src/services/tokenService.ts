// src/services/tokenService.js
import { ofetch } from 'ofetch'
import Cookies from 'js-cookie'
import {jwtDecode} from "jwt-decode";

import { getSessionId } from './sessionService'

const API_URL = import.meta.env.VITE_API_URL || '/api'
// Cookie names
const AUTH_TOKEN_COOKIE = 'auth_token'
const REFRESH_TOKEN_COOKIE = 'refresh_token'
// Token expiration time in days
const TOKEN_EXPIRY = 7

export const getTokenExpiration = (token) => {
    try {
        const { exp } = jwtDecode(token);
        return exp ? exp * 1000 : null; // Convert to milliseconds
    } catch (error) {
        console.error("Invalid JWT:", error);
        return null;
    }
}

export const isTokenExpiringSoon = (token) => {
    try {
        const { exp } = jwtDecode(token);
        console.log(exp, exp * 1000 - Date.now() <= 5 * 60 * 1000)
        return exp * 1000 - Date.now() <= 5 * 60 * 1000; // Check if ≤ 5 minutes left
    } catch (error) {
        console.error("Invalid JWT:", error);
        return true; // Assume expired if decoding fails
    }
}
/**
 * Obtain JWT tokens using session ID from SessionStorage
 * @returns {Promise<boolean>} - Success status
 */
export const obtainToken = async () => {
    try {
        // Get session ID from SessionStorage
        const sessionId = getSessionId()
        if (!sessionId) {
            console.error('No session ID found in SessionStorage')
            return false
        }

        const response = await ofetch(`${API_URL}/obtain-token/`, {
            method: 'POST',
            body: { session_id: sessionId }
        })
        if (response && response.access && response['refresh']) {
            Cookies.set(AUTH_TOKEN_COOKIE, response.access, { expires: TOKEN_EXPIRY, secure: true, sameSite: 'strict' })
            Cookies.set(REFRESH_TOKEN_COOKIE, response['refresh'], { expires: TOKEN_EXPIRY, secure: true, sameSite: 'strict' })
            return true
        }
        return false
    } catch (error) {
        console.error('Error obtaining token:', error)
        return false
    }
}

/**
 * Refresh JWT tokens
 * @returns {Promise<boolean>} - Success status
 */
export const refreshTokens = async () => {
    const refreshToken = Cookies.get(REFRESH_TOKEN_COOKIE)
    if (!refreshToken) return false

    try {
        const response = await ofetch(`${API_URL}/refresh-token/`, {
            method: 'POST',
            body: { refresh_token: refreshToken },
            headers: { 'Content-Type': 'application/json' }
        })

        if (response && response.auth_token) {
            Cookies.set(AUTH_TOKEN_COOKIE, response.auth_token, { expires: TOKEN_EXPIRY, secure: true, sameSite: 'strict' })
            if (response.refresh_token) {
                Cookies.set(REFRESH_TOKEN_COOKIE, response.refresh_token, { expires: TOKEN_EXPIRY, secure: true, sameSite: 'strict' })
            }
            return true
        }
        return false
    } catch (error) {
        console.error('Error refreshing token:', error)
        return false
    }
}

/**
 * Get the current auth token
 * @returns {string|null} - The auth token or null if not found
 */
export const getAuthToken = () => {
    return Cookies.get(AUTH_TOKEN_COOKIE)
}

/**
 * Get the current refresh token
 * @returns {string|null} - The refresh token or null if not found
 */
export const getRefreshToken = () => {
    return Cookies.get(REFRESH_TOKEN_COOKIE)
}

/**
 * Clear all tokens from cookies
 */
export const clearTokens = () => {
    Cookies.remove(AUTH_TOKEN_COOKIE)
    Cookies.remove(REFRESH_TOKEN_COOKIE)
}

export default {
    obtainToken,
    refreshTokens,
    getAuthToken,
    getRefreshToken,
    clearTokens
}
