import apiService from '@/services/apiService';
import { Experience } from '@/types/Experience';

const ExperiencesAPI = {
    /*
        * Fetches all experiences from the backend
        * @returns array of experiences
    */
    getAllExperiences: async (): Promise<Experience[]> => {
        try {
            const response = await apiService.get('/experiences/get_experiences/');
            const experiences = response.data;
            return experiences;
        } catch (error) {
            console.error("Error fetching experiences:", error);
            throw error;
        }
    },
};

export default ExperiencesAPI;