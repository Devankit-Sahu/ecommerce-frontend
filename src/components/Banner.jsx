import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Keyboard, Pagination, Navigation } from "swiper/modules";
import { Button } from "@mui/material";
import { data } from "../constants/constant";

const Banner = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation={false}
      loop={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="h-[70vh]"
    >
      {data.map((item) => (
        <SwiperSlide
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            backgroundImage: `url(${item.img_src})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          key={item.id}
        >
          <div className="flex items-center flex-[0.6] ml-32">
            <div className="slide-content">
              <h2 className=" text-indigo-600 text-[30px] mb-4 capitalize tracking-wide">
                {item.sub_title}
              </h2>
              <h1 className="slide-title text-[55px] text-[#222] mb-4 relative uppercase">
                {item.title}
              </h1>
              <div className="slide-desc">{item.desc}</div>
              <Button variant="contained" className="mt-6">
                Shop now
              </Button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
