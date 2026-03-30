import apiClient from './apiClient';

const giftService = {
    getAll: async () => {
        const response = await apiClient.get('gifts');
        return response.data;
    },

    getCategories: async () => {
        const response = await apiClient.get('/gifts/categories');
        return response.data;
    },

    addCategory: async (name) => {
        const response = await apiClient.post('/gifts/categories', { name });
        return response.data;
    },

    updateCategory: async (id, name) => {
        const response = await apiClient.put(`/gifts/categories/${id}`, { name });
        return response.data;
    },

    deleteCategory: async (id) => {
        const response = await apiClient.delete(`/gifts/categories/${id}`);
        return response.data;
    },

    getOne: async (id) => {
        const response = await apiClient.get(`gifts/${id}`);
        return response.data;
    },

    create: async (formData) => {
        const response = await apiClient.post('gifts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    update: async (id, formData) => {
        // Laravel doesn't handle natively multipart/form-data with PUT/PATCH easily
        // so we use POST for update if it has files
        const response = await apiClient.post(`gifts/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    delete: async (id) => {
        const response = await apiClient.delete(`gifts/${id}`);
        return response.data;
    },
};

export default giftService;
