import axios from 'axios';
import { API_URL } from './Api';

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
