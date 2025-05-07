import React, { useEffect, useState } from 'react';
import banner01 from '../../assets/image/banner01.jpg';
import banner02 from '../../assets/image/banner02.png';
import banner03 from '../../assets/image/banner03.jpg';
import banner04 from '../../assets/image/banner04.jpg';
import banner05 from '../../assets/image/banner05.jpg';

import 'swiper/css';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fakeBanners = [
      { id: 1, image: banner01 },
      { id: 2, image: banner02 },
      { id: 3, image: banner03 },
      { id: 4, image: banner04 },
      { id: 5, image: banner05 },
    ];

    setTimeout(() => {
      setBanners(fakeBanners);
    }, 500);
  }, []);

  return (
    <div className="relative w-full h-60 md:h-96 lg:h-[600px] overflow-hidden rounded-lg shadow-lg m-5">
      <Swiper
        effect={'fade'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[EffectFade, Pagination, Autoplay]}
        className="w-full h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className="flex items-center justify-center">
            <img
              src={banner.image}
              alt={`Slide ${banner.id}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
