
import React, {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import {BrandService} from "../../service/BrandService";
const API_URL = import.meta.env.VITE_API_URL;
const BrandLogos =()=>{
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchBrands = async ()=>{
            try{
                    const data = await BrandService.getBrands();
                    setBrands(data);
                    setLoading(false);
            }
            catch(error){
                setError(error.message);
                setLoading(false);
            }
        }
            fetchBrands();
    },[]);

    const handleBrandClick = (brandId) => {
      navigate(`/shop?brandId=${brandId}`);
    };
    if (loading) {
        return <div className="text-center py-8">Đang tải...</div>;
      }
    
      if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
      }
return(      
<div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-9xl mx-auto px-4 py-8">
    {brands.length > 0 ? (
        brands.map((brand)=>(
            <div key={brand.branD_ID} className="flex justify-center items-center">
                <img
                    // className="h-auto max-w-full rounded-lg object-contain"
                         className="w-full h-60 object-cover transition-transform group-hover:scale-105 cursor-pointer"
                    // src={brand.branD_IMAGE}
                    src={`${API_URL}/images/${brand.branD_IMAGE}`}
                    alt={brand.branD_NAME || 'Logo thương hiệu'}
                    style={{ maxHeight: '500px' }}
                    onClick={()=>handleBrandClick(brand.branD_ID)}
                    />
            </div>
        ))
    ):(Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex justify-center items-center">
          <img
            className="h-auto max-w-full rounded-lg object-contain"
            src={`https://flowbite.s3.amazonaws.com/docs/gallery/square/image-${index}.jpg`}
            alt={`Logo placeholder ${index + 1}`}
            style={{ maxHeight: '100px' }}
          />
        </div>
      ))
    )}
 
</div>


)
}
export default BrandLogos

