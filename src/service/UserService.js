// import axios from 'axios';
// import { API_URL } from './Api';

// export const register = async (userData) =>{
//     try{
//         const response = await axios.post(`${API_URL}/api/User/Register`, {
//             useR_EMAIL: userData.email,
//             useR_PASSWORD: userData.password,
//             useR_FIRST_NAME: userData.firstName,
//             useR_LAST_NAME: userData.lastName,
//             useR_PHONE: userData.phone,
//             useR_GENDER: userData.gender,
//             useR_BIRTH: userData.birthDate
//         });
//         return response.data
//     }
//         catch(error){
//             throw error.response || { message: 'Lỗi kết nối server' };
//         }
//     }
// export const login = async (useR_EMAIL, useR_PASSWORD) => {
//     try {
//         const response = await axios.post(`${API_URL}/api/User/Login`, {
//             useR_EMAIL,
//             useR_PASSWORD
//         });
//         localStorage.setItem("token", response.data.token);
//         return response.data;
//     } catch (error) {
//         throw error.response || { message: 'Lỗi kết nối server' };
//     }
// };

// export const VerifyOTP = async (data)=>{
//     try{
//         const response = await axios.post(`${API_URL}/api/User/AuthAccount`,{
//             email: data.email,
//             otp: data.otp
//         })
//         return response.data
//     }
//     catch(error){
//         throw error.response || { message: 'Lỗi kết nối server' };
//     }
// }
// export const SendOtpEmail = async (email, userName)=>{
//     try{
//         const response = await axios.post(`${API_URL}/api/User/SendOTP`,{
//             email: email,
//             username: userName
//         })
//         return response.data
//     }
//     catch(error){
//         throw error.response || { message: 'Lỗi kết nối server' };
//     }
// }

// export const GetInformation = async (token) => {
//     try {
//         const response = await axios.get(`${API_URL}/api/User/Information`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response || { message: 'Lỗi kết nối server' };
//     }
// }

// export const GetAddress = async (token) => {
//     try {
//         const response = await axios.get(`${API_URL}/api/Address/GetById`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response || { message: 'Lỗi kết nối server' };
//     }
// }

import axios from 'axios';
import { API_URL } from './Api';

export const register = async (userData) => {
    try {
        console.log('Sending register request:', userData);

        const response = await axios.post(`${API_URL}/api/User/Register`, {
            useR_FIRST_NAME: userData.firstName,
            useR_LAST_NAME: userData.lastName,
            useR_EMAIL: userData.email,
            useR_PHONE: userData.phone,
            useR_PASSWORD: userData.password,
            useR_GENDER: userData.gender,
            useR_BIRTHDATE: userData.birthDate
        });

        console.log('Register API Response:', response);

        return {
            success: true,
            data: response.data,
            message: "Đăng ký thành công"
        };
    } catch (error) {
        console.error('Register API Error:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Lỗi đăng ký'
        };
    }
};
export const login = async (useR_EMAIL, useR_PASSWORD) => {
    try {
        const response = await axios.post(`${API_URL}/api/User/Login`, {
            useR_EMAIL    : useR_EMAIL,
            useR_PASSWORD : useR_PASSWORD
        });
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: error.message || 'Lỗi đăng nhập' };
    }
};

export const VerifyOTP = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/api/User/AuthAccount`, {
            email: data.email,
            otp: data.otp
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: error.message || 'Lỗi xác thực OTP' };
    }
};

export const SendOtpEmail = async (email, userName) => {
    try {
        const response = await axios.post(`${API_URL}/api/AuthAccount/SendOtpToEmail`, {
            email: email,
            useR_NAME: userName
        });
        console.log('Response:', response);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: error.message || 'Lỗi gửi OTP' };
    }
};

export const GetInformation = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/User/Information`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: error.message || 'Lỗi lấy thông tin' };
    }
};

export const GetAddress = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/Address/GetById`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: error.message || 'Lỗi lấy địa chỉ' };
    }
};