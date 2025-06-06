import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const CreateOrderDetail = async ( orderId, input) => {
    try {
        const response = await axios.post(
            `${API_URL}/api/Order/CreateOrderDetail`, 
            input,
            {
                params: {
                    OrderId: orderId
                },
                headers: {
                    'Content-Type': 'application/json',
            
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}
