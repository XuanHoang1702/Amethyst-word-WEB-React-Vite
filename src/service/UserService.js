import axios from 'axios';
import { API_URL } from './Api';

export const login = async (useR_EMAIL, useR_PASSWORD) => {
    try {
        const response = await axios.post(`${API_URL}/User/Login`, {
            useR_EMAIL,
            useR_PASSWORD
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
};
