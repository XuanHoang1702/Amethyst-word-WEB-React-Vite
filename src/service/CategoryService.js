
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export const CategoryService = {
    getAllCategories: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/Category/GetList`);

            const categoriesWithIcons = response.data.map(category => {
                
                return {
                    id: category.categorY_ID,
                    name: category.categorY_NAME,
                    icon: category.icoN_NAME,
                    color: category.icoN_COLOR
                    
                }
            });
            
            return categoriesWithIcons;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
};