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
        const response = await axios.get(`${API_URL}/api/Product/Detail`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                input: input
            }
        });

        if (!response.data || !response.data.data) {
            throw new Error("Không tìm thấy thông tin sản phẩm");
        }

        const product = response.data.data;
        
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

// export const ProductSearch = async (name, pageNumber = 1, pageSize = 10) => {
//     if (!name || name.trim === '') {
//         throw new Error('Vui lòng nhập từ khoá tìm kiếm');
//     }
//     try {
//         const response = await axios.get(`${API_URL}/api/Product/Search`, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             params: {
//                 name: name,
//                 pageNumber: pageNumber,
//                 pageSize: pageSize
//             }
//         });
        
//         // Log response để debug
//         console.log("Raw API Response:", response.data);
        
//         // Kiểm tra cấu trúc response
//         let products = [];
//         if (Array.isArray(response.data)) {
//             products = response.data;
//         } else if (response.data.data && Array.isArray(response.data.data)) {
//             products = response.data.data;
//         } else {
//             console.error("Invalid response format:", response.data);
//             throw new Error("Dữ liệu không đúng định dạng");
//         }
        
//         // Map dữ liệu và đảm bảo có ID
//         return products.map(product => ({
//             ...product,
//             producT_ID: product.producT_ID || product.id || 1
//         }));
//     } catch (error) {
//         console.error("Search API Error:", error);
//         throw error.response || { message: 'Lỗi kết nối server' };
//     }
// }

// export const ProductSearch = async (name, pageNumber = 1, pageSize = 10) => {
//     if (!name || name.trim() === '') {
//         throw new Error('Vui lòng nhập từ khoá tìm kiếm');
//     }
//     try {
//         // Gọi API tìm kiếm
//         const response = await axios.get(`${API_URL}/api/Product/Search`, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             params: {
//                 name: name.trim(),
//                 pageNumber: pageNumber,
//                 pageSize: pageSize
//             }
//         });

//         // Kiểm tra và xử lý dữ liệu trả về
//         let products = [];
//         if (response.data && Array.isArray(response.data)) {
//             products = response.data;
//         } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
//             products = response.data.data;
//         }

//         // Nếu không có sản phẩm nào, trả về mảng rỗng ngay
//         if (products.length === 0) {
//             return [];
//         }

//         // Lọc bỏ sản phẩm có producT_ID = 0 trước khi gọi API Detail
//         const filteredProducts = products.filter(product => product.producT_ID && product.producT_ID !== 0);

//         // Gọi API Detail để lấy thông tin chi tiết cho từng sản phẩm
//         const validatedProducts = await Promise.all(
//             filteredProducts.map(async (product) => {
//                 try {
//                     // Gọi API Detail với ID của sản phẩm
//                     const detailResponse = await axios.get(`${API_URL}/api/Product/Detail`, {
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         params: {
//                             input: product.producT_ID
//                         }
//                     });

//                     // Kiểm tra và trả về sản phẩm với thông tin chi tiết
//                     if (detailResponse.data && detailResponse.data.data) {
//                         return {
//                             ...product,
//                             ...detailResponse.data.data
//                         };
//                     }
//                     return product;
//                 } catch (error) {
//                     console.error(`Lỗi khi lấy chi tiết sản phẩm ${product.producT_NAME}:`, error);
//                     return product;
//                 }
//             })
//         );

//         // Lọc bỏ các sản phẩm không hợp lệ hoặc null
//         const finalProducts = validatedProducts.filter(product => 
//             product && product.producT_ID && product.producT_ID !== 0
//         );

//         return finalProducts;

//     } catch (error) {
//         console.error("Lỗi tìm kiếm:", error);
//         throw new Error('Lỗi khi tìm kiếm sản phẩm');
//     }
// }
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
