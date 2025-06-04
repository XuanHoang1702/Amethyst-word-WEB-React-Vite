import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

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

export const addToCart = async (token, productId, quantity,colorId, sizeId) => {
    try {
        const response = await axios.post(`${API_URL}/api/Cart/Create`, {
            producT_ID: productId,
            quantity: quantity,
            coloR_ID: colorId,
            sizE_ID: sizeId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
}

export const deleteCart = async (token, productId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/Cart/Delete`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: productId
        });
        console.log('Delete response:', response.data);
        return response.data;
    }
    catch (error) {
        console.error('Error deleting from cart:', error);
        throw error;
    }
}
                