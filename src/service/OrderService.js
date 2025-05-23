import axios from 'axios';
import { API_URL } from './Api';

export const CreateOrder = async (token, input) => {
    try {
        const response = await axios.post(`${API_URL}/api/Order/CreateOrder`, input, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        localStorage.setItem('orderId', response.data.result);
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const GetStatus = async (token, id) => {
    try {
        const response = await axios.get(`${API_URL}/api/Order/GetStatus?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

