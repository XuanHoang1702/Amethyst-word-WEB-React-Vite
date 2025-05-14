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

export const GetProductDetail = async (input) => {
    try {
        const response = await axios.get(`${API_URL}/api/Product/Detail`, {
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

export const ProductPaging = async (pageNumber = 1, pageSize = 8) => {
    try {
        const response = await axios.get(`${API_URL}/api/Product/ProductList`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                pageNumber: pageNumber,
                pageSize: pageSize,
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const ProductSearch = async (name, pageNumber, pageSize) => {
    try {
        const response = await axios.get(`${API_URL}/api/Product/Search`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                name: name,
                pageNumber: pageNumber,
                pageSize: pageSize
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}