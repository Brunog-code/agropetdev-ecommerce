"use client";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import banner0 from "@/public/banner0.webp";
import banner1 from "@/public/banner1.webp";
import banner2 from "@/public/banner2.webp";
import banner3 from "@/public/banner3.webp";

import { BannerSkeleton } from "./banner-skeleton";

export function BannerSwiper() {
  const [isMobile, setIsmobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkScreen = () => {
      if (window.innerWidth < 640) {
        setIsmobile(true);
      } else {
        setIsmobile(false);
      }
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (isMobile == null) {
    return <BannerSkeleton/>;
  }

  return (
    <div className="w-full h-52 sm:h-72 md:h-96">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        allowTouchMove={true}
        loop={true}
        slidesPerView={isMobile ? 1 : 2}
        spaceBetween={15}
        className="w-full h-full"
      >
        {[banner1, banner0, banner2, banner3].map((img, idx) => (
          <SwiperSlide key={idx} className="w-[300px] md:w-[380px] h-full">
            <div className="relative w-full h-full overflow-hidden rounded-xl ">
              <Image
                src={img}
                alt={`banner ${idx + 1}`}
                fill
                className={`${
                  isMobile ? "object-contain" : "object-cover"
                } rounded-xl`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
