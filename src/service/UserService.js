import axios from 'axios';
import { API_URL } from './Api';

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/api/User/Register`, {
            useR_FIRST_NAME: userData.firstName,
            useR_LAST_NAME: userData.lastName,
            useR_EMAIL: userData.email,
            useR_PHONE: userData.phone,
            useR_PASSWORD: userData.password,
            useR_GENDER: userData.gender,
            useR_BIRTHDATE: userData.birthDate
        });

        return response.data;
    } catch (error) {
        return error.response || { message: 'Lỗi kết nối server' };
    }
};

export const login = async (useR_EMAIL, useR_PASSWORD) => {
    try {
        const response = await axios.post(`${API_URL}/api/User/Login`, {
            useR_EMAIL,
            useR_PASSWORD
        });
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
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
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const GetAddress = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/Address/GetById`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const SendEmail = async (email, name) => {
    try {
        const response = await axios.post(`${API_URL}/api/AuthAccount/SendOtpToEmail`, {
            headers:{
                'Content-Type': 'application/json',
            },
        },            {
            email: email,
            name: name
        });
        return response.data;
    } catch(error) {
        throw error.response || { message: 'Lỗi kết nối server' }
    }
}

export const Certificate = async (email, OTP) => {
    try {
        const response = await axios.post(`${ API_URL }/api/UserController/AuthAccount`,
            {
                headers: {
                    'Content-Type': 'application.json',
                }
            },
            {
                email: email,
                otp: OTP
            }
        );
        return response;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' }
    }
}

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