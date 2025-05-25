import axios from 'axios';
import { API_URL } from "./Api";

export const BrandService = {
    getBrands: async ()=>{
        try{
            const response = await axios.get(`${API_URL}/api/Brand/GetList`,{
            headers: {
                'Content-Type': 'application/json',
            }
        }
        )
            return response.data;

        }
        catch(error){
            throw error.response || { message: 'Lỗi kết nối server' };
        }
    }
}
