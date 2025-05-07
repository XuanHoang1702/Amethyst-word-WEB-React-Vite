import React from 'react';
import ads01 from "../../assets/image/ads01.jpg";
import ads02 from "../../assets/image/ads02.jpg";
import ads03 from "../../assets/image/ads03.jpg";
import ads04 from "../../assets/image/ads04.jpg";

const Ads = () => {
  const adsImages = [
    { src: ads01, title: "Advertisement 1" },
    { src: ads02, title: "Advertisement 2" },
    { src: ads03, title: "Advertisement 3" },
    { src: ads04, title: "Advertisement 4" },
    { src: ads04, title: "Advertisement 4" },
    { src: ads04, title: "Advertisement 4" },
  ];

  return (
    <div className="flex justify-center items-center  my-10 ">
      {adsImages.map((ad, index) => (
        <div key={index} className="relative w-1/4 group ml-6 p-3 pl-1 ">
          <img
            src={ad.src}
            alt={ad.title}
            className="w-[325px] h-[325px] object-cover  rounded-lg shadow-md"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white font-semibold text-lg">{ad.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ads;
