// import axios from "axios";
// import { API_URL } from "./Api";
// import { getCategoryIcon } from "../utils/getCategoryIcon";

// export const CategoryService = {
//     getAllCategories: async () => {
//         try {
//             const response = await axios.get(`${API_URL}/api/Category/GetList`);
//             console.log('API Response:', response.data); // Log response data

//             const categoriesWithIcons = response.data.map(category => {
//                 const icon = getCategoryIcon(category.categorY_NAME);
//                 console.log('Category name:', category.categorY_NAME, 'Icon:', icon); // Log each mapping
                
//                 return {
//                     id: category.categorY_ID,
//                     name: category.categorY_NAME,
//                     icon: icon,
//                 };
//             });
            
//             return categoriesWithIcons;
//         } catch (error) {
//             console.error('API Error:', error);
//             throw error;
//         }
//     }
// };
import axios from "axios";
import { API_URL } from "./Api";
import { getCategoryIcon } from "../utils/getCategoryIcon";

export const CategoryService = {
    getAllCategories: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/Category/GetList`);
            
            // Log raw API response
            console.log('Raw API Response:', response.data);

            const categoriesWithIcons = response.data.map(category => {
                const icon = getCategoryIcon(category.categorY_NAME);
                
                return {
                    id: category.categorY_ID,
                    name: category.categorY_NAME,
                    icon: icon,
                    status: category.categorY_STATUS
                };
            });
            
            console.log('Processed categories:', categoriesWithIcons);
            
            return categoriesWithIcons;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
};