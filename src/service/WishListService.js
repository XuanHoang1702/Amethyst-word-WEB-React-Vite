import axios from 'axios';
import { API_URL } from './Api';

export const GetWishList = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/WishList/GetAll`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const AddWishList = async (token, productId) => {
    try {
        const response = await axios.post(`${API_URL}/api/Wish_list/Create`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                id: productId,
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const DeleteWishList = async (token, productId) => {
    try {
        const response = await axios.post(`${API_URL}/api/WishList/Delete`, {
            productId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}