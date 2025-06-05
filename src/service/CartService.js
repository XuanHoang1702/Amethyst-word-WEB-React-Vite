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

export const addToCartNoAuth = (producT_ID, producT_NAME, producT_PRICE, imagE_NAME, coloR_NAME, sizE_NAME, quantity) => {
    const cart = JSON.parse(localStorage.getItem("cartItem")) || [];

    const existingIndex = cart.findIndex(item =>
        item.producT_ID === producT_ID &&
        item.producT_NAME === producT_NAME &&
        item.producT_PRICE == producT_PRICE &&
        item.coloR_NAME === coloR_NAME &&
        item.sizE_NAME === sizE_NAME
    );

    if (existingIndex !== -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({
        producT_ID,
        producT_NAME,
        producT_PRICE,
        imagE_NAME,
        coloR_NAME,
        sizE_NAME,
        quantity
        });
    }

    localStorage.setItem("cartItem", JSON.stringify(cart));
};
