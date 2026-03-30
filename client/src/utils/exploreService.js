import apiClient from './apiClient';

const exploreService = {
    /**
     * Get root sections (3 main categories)
     */
    getRootSections: async () => {
        try {
            const response = await apiClient.get('explore/root-sections');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Get node details by slug
     */
    getNodeDetails: async (slug) => {
        try {
            const response = await apiClient.get(`explore/node/${slug}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Get full tree (admin)
     */
    getFullTree: async () => {
        try {
            const response = await apiClient.get('explore/tree');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Get children of a node
     */
    getChildren: async (parentId) => {
        try {
            const response = await apiClient.get(`explore/children/${parentId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Create a new node (admin)
     */
    createNode: async (nodeData) => {
        try {
            const response = await apiClient.post('explore/nodes', nodeData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Update a node (admin)
     */
    updateNode: async (nodeId, nodeData) => {
        try {
            const response = await apiClient.post(`explore/nodes/${nodeId}`, nodeData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Delete a node (admin)
     */
    deleteNode: async (nodeId) => {
        try {
            const response = await apiClient.delete(`explore/nodes/${nodeId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Upload gallery images for a node (admin)
     */
    uploadGallery: async (nodeId, formData) => {
        try {
            const response = await apiClient.post(
                `explore/nodes/${nodeId}/gallery`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Delete gallery image (admin)
     */
    deleteGalleryImage: async (imageId) => {
        try {
            const response = await apiClient.delete(`explore/nodes/gallery/${imageId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Bulk cleanup metadata key for all children
     */
    bulkMetadataCleanup: async (parentId, key) => {
        try {
            const response = await apiClient.post(`explore/nodes/${parentId}/bulk-metadata-cleanup`, { key });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Sync column configuration to all sibling nodes
     */
    syncSiblingsColumns: async (id, columns) => {
        try {
            const formData = new FormData();
            formData.append('columns', JSON.stringify(columns));
            
            const response = await apiClient.post(`explore/nodes/${id}/sync-columns`, formData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default exploreService;
