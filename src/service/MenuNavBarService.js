import {API_URL} from './Api';
import axios from 'axios';

export const MenuNavBarService = {
    getMenuList: async () => {
        try{
            const response = await axios.get(`${API_URL}/Menu/GetList`);
            return response.data;
        }catch(error){
            throw error.response || { message: 'Lỗi kết nối server' };
        }
        
    },
}
