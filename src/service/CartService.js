import axios from 'axios';
import { API_URL } from './Api';

export const getCart = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/Cart/GetList`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
}