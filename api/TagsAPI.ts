/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This module provides a `TagsAPI` object for handling tag-related operations. 
 * It includes a method (`getAllTags`) to fetch all tags from the backend, sorted by name, 
 * ensuring efficient retrieval and error handling for seamless integration with the application.
 */

import apiService from '@/services/apiService';
import { Tag } from '@/types/Tag';

const TagsAPI = {
    /*
        * Fetches all tags from the backend sorted by name
        * @returns array of tags
    */
    getAllTags: async (): Promise<Tag[]> => {
        try {
            const response = await apiService.get('/tags/get_tags/');
            const tags = response.data;
            return tags;
        } catch (error) {
            console.error("Error fetching tags:", error);
            throw error;
        }
    },
};

export default TagsAPI;