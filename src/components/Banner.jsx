import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Keyboard, Pagination, Navigation } from "swiper";
import img1 from "../assets/bannerimg1.jpg";
import img2 from "../assets/bannerimg2.jpg";
import { Button } from "@mui/material";
const data = [
  {
    id: 1,
    img_src: "",
    sub_title: "sale offer",
    title: "new fashion summer sale",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.Expedita, sequi!",
    imgurl: img1,
  },
  {
    id: 2,
    img_src: "",
    sub_title: "trending item",
    title: "women's latest fashionable sale",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.Expedita, sequi!",
    imgurl: img2,
  },
  {
    id: 3,
    img_src: "",
    sub_title: "Trending Accessories",
    title: "modern sunglasses",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.Expedita, sequi!",
    imgurl: img1,
  },
];

const Banner = () => {
  return (
    <div className="imgslider m-9 h-[50vh]">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Keyboard, Pagination, Navigation]}
        className="container"
      >
        {data.map((item) => (
          <SwiperSlide
            style={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              backgroundImage: `url(${item.imgurl})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "100%",
            }}
            key={item.id}
          >
            <div className="flex items-center flex-[0.6] ml-32">
              <div className="slide-content">
                <h2 className=" text-indigo-600 text-[30px] mb-4 capitalize tracking-wide">
                  {item.sub_title}
                </h2>
                <h1 className="slide-title text-[55px] text-[#222] mb-4 relative uppercase">{item.title}</h1>
                <div className="slide-desc">{item.desc}</div>
                <Button variant="contained" className="mt-6">Shop now</Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
