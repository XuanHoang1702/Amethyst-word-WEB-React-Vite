import axios from 'axios';

export const ProductNew = async (input) => {
    try {
        const response = await axios.get('http://192.168.1.26:5000/api/Product/ProductNew', {
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
