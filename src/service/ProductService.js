import axios from 'axios';
import { API_URL } from './Api';

export const ProductNew = async (input) => {
    try {
        const response = await axios.get(`${API_URL}/api/Product/ProductNew`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                input: input,
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const ProductBestSeller = async (input) => {
    try {
        const response = await axios.get(`${API_URL}/api/Product/ProductBestSeller`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                input: input,
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const ProductSaleNoPaging = async (input) => {
    try {
        const response = await axios.get(`${API_URL}/api/Product/DiscountHome`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                input: input,
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}