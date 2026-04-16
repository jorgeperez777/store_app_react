import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CarouselComponent.css";

export default function CarouselComponent({ listItems = [] }) {
  return (
    <div>
      <Swiper
        className="swiper"
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        spaceBetween={20}
        slidesPerView={1}
      >
        {listItems.map((item) => (
          <SwiperSlide>
            <img className="swiper-img " src={item.url_image} alt={item.name} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
