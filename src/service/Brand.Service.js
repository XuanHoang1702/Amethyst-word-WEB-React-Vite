import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

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
