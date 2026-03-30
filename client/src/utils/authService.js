import apiClient from './apiClient';

const authService = {
    /**
     * Register a new user
     */
    register: async (userData) => {
        try {
            const response = await apiClient.post('register', {
                first_name: userData.first_name || userData.firstName,
                last_name: userData.last_name || userData.lastName,
                email: userData.email,
                password: userData.password,
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Login user
     */
    login: async (email, password) => {
        try {
            const response = await apiClient.post('login', {
                email,
                password,
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Forgot password
     */
    forgotPassword: async (email) => {
        try {
            const response = await apiClient.post('forgot-password', {
                email,
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Get current user details
     */
    getCurrentUser: async () => {
        try {
            const response = await apiClient.get('user');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Logout user
     */
    logout: async () => {
        try {
            const response = await apiClient.post('logout');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return response.data;
        } catch (error) {
            // Clear local storage even if request fails
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            throw error.response?.data || error.message;
        }
    },

    /**
     * Save token and user to localStorage
     */
    setAuthData: (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    },

    /**
     * Get token from localStorage
     */
    getToken: () => {
        return localStorage.getItem('token');
    },

    /**
     * Get user from localStorage
     */
    getUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    /**
     * Clear auth data
     */
    clearAuth: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
};

export default authService;
