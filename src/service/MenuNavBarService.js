import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const MenuNavBarService = {
    getMenuList: async () => {
        try{
            const response = await axios.get(`${API_URL}/api/Menu/GetList`);
            return response.data;
        }catch(error){
            throw error.response || { message: 'Lỗi kết nối server' };
        }
        
    },
}
