import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import { Trophy } from 'lucide-react';

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

export const ProductRelated = async (input)=>{
    try{
        const response = await axios.get(`${API_URL}/api/Product/Related`,{
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                input: input
            }
    })
    return response.data
    }
    catch(error){
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const GetProductDetail = async (input) => {
    if (!input || input === '0' || input === 0) {
        throw new Error("ID sản phẩm không hợp lệ");
    }

    try {
        console.log("Fetching product detail with ID:", input);
        const response = await axios.get(`${API_URL}/api/Product/Detail?input=${input}`, {
            headers: {
                'Content-Type': 'application/json',
            },
          
        });

        if (!response.data || !response.data) {
            throw new Error("Không tìm thấy thông tin sản phẩm");
        }

        const product = response.data;
        
        if (!product.producT_ID || product.producT_ID === 0) {
            throw new Error("ID sản phẩm không hợp lệ");
        }
        console.log("Product detail response:", response.data);
        return response.data;

    } catch (error) {
        console.error("Error fetching product detail:", error);
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const ProductPaging = async (pageNumber = 1, pageSize = 8, categoryId = null) => {
    try {
        const response = await axios.get(`${API_URL}/api/Product/ProductList`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                pageNumber: pageNumber,
                pageSize: pageSize,
                categoryId: categoryId
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const ProductColors = async (id)=>{
    try{
        const response = await axios.get(`${API_URL}/api/Product/GetColor`,{
            headers:{
                'Content-Type': 'application/json',
            },
            params:{
                id:id
            }
        })
        return response.data;
    }
    catch(error){
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const ProductSizes = async (id)=>{
    try{
        const response = await axios.get(`${API_URL}/api/Product/getSize`,{
            headers:{
                "Content-Type":"application/json"
            },
            params:{
                id:id
            }
        })
        return response.data;
    }
    catch(error){
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const ProductSearch = async (name, pageNumber = 1, pageSize = 10) => {
    if (!name || name.trim === ''){
        throw new Error('Vui lòng nhập từ khoá tìm kiếm ');
    }
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
        console.log(response.data);
        return response.data.data || [];   
    } catch (error) {
        throw error.response || { message: 'Lỗi kết nối server' };
    }
}

export const ProductFilter = async(brandId=null, categoryId=null, priceMin=0, pricaMax=0, pageNumber=1, pageSize=10)=>{
    try{
        const response = await axios.get(`${API_URL}/api/Product/Fillter`,{
            headers:{
                'Content-Type':'application/json'
            },
            params:{
                brandId: brandId || undefined, 
                categoryId: categoryId || undefined,
                priceMin,
                pricaMax,
                pageNumber,
                pageSize
            }
          
        })
        return response.data;
    }
    catch(error){
        throw error.response || { message: 'Lỗi kết nối server' };

    }
}
