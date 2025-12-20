"use client";

import "swiper/css";

import Image from "next/image";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import logoGenco from "@/app/assets/logo-partners/logo-genco.png";
import logoGolden from "@/app/assets/logo-partners/logo-golden.webp";
import logoMagnus from "@/app/assets/logo-partners/logo-magnus.png";
import logoNexgard from "@/app/assets/logo-partners/logo-nexgard.png";
import logoPedigree from "@/app/assets/logo-partners/logo-pedigree.webp";
import logoPremier from "@/app/assets/logo-partners/logo-premier.png";

export function PartnersSwiper() {
  const imgsPartnersBase = [
    logoGolden,
    logoPremier,
    logoMagnus,
    logoPedigree,
    logoGenco,
    logoNexgard,
  ];
  const imgsPartners = [...imgsPartnersBase, ...imgsPartnersBase];

  return (
    <div className="w-full overflow-hidden z-0">
      {" "}
      {/* garante que nada vaze */}
      <Swiper
        modules={[Autoplay, FreeMode]}
        breakpoints={{
          0: { slidesPerView: 3 },
          768: { slidesPerView: 5},
        }}
        spaceBetween={2}
        loop={true}
        centeredSlides={false}
        allowTouchMove={false}
        speed={1800} // tempo que leva para completar o movimento
        autoplay={{
          delay: 1, // quase contínuo (use 0.5/1; 0 às vezes dá bugs)
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        freeMode={false}
        className="pointer-events-none"
      >
        {imgsPartners.map((card, i) => (
          <SwiperSlide
            key={i}
            className="w-28 h-20 bg-white rounded-lg flex items-center justify-center p-2 gap-2"
          >
            {" "}
            {/* largura fixa */}
            <div className="h-24 flex items-center justify-center gap-2">
              <Image
                src={card}
                alt={`Logo ${i}`}
                width={150}
                height={100}
                className="object-contain bg-white  p-6"
                priority={false}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
