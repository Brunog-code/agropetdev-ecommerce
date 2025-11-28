"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export function PromocoesCarousel() {
  return (
    <section className="w-full">
      <style>
        {`
            .swiper-button-prev, .swiper-button-next {
            color: #fff; 
            border-radius: 50%; 
            width: 40px; /* Tamanho das setas */
            height: 40px;
          }

          .swiper-button-prev:hover, .swiper-button-next:hover {
            color: green;
          }`}
      </style>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3500 }}
        slidesPerView={1}
        loop={true}
        className="mx-auto"
      >
        <SwiperSlide>
          <div className="flex justify-center items-center w-full h-full">
            <span className="text-lg font-semibold">
              🥇 Ração Premium 15kg - 20% OFF
            </span>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex justify-center items-center w-full h-full">
            <span className="text-lg font-semibold ">
              🐱 Areia Sanitária 12kg - Leve 2 Pague 1
            </span>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex justify-center items-center w-full h-full">
            <span className="text-lg font-semibold ">
              🐶 Shampoo Pet - 30% de desconto
            </span>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
