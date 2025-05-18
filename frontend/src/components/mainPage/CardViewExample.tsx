// src/components/CardViewExample.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

interface Props {
  autoplayEnabled: boolean;
}

export default function CardViewExample({ autoplayEnabled }: Props) {
  return (
    <section className="w-full px-8 mt-16">
      <h2 className="text-white-bold text-2xl mb-4">다른 사람들의 포트폴리오 확인하기</h2>

      <Swiper
        key={autoplayEnabled ? "autoplay" : "static"}
        modules={[Autoplay]}
        spaceBetween={24}
        slidesPerView={3}
        loop={true}
        autoplay={
          autoplayEnabled
            ? {
                delay: 0,
                disableOnInteraction: false,
              }
            : false
        }
        speed={4000}
        allowTouchMove={false}
      >
        {Array.from({ length: 5 }).map((_, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex flex-col justify-between border-gray card-gray-hv cursor-pointer transition duration-200 min-w-[300px] aspect-[3/2] p-6">
              <div className="w-full h-4/5 card-lightgray mb-4" />
              <div>
                <h3 className="text-white-bold text-xl mb-1">사용자 {idx + 1}</h3>
                <p className="text-sm text-gray-300 line-clamp-2">
                  포트폴리오 소개 요약입니다. 간단한 설명이나 태그를 표시할 수 있어요.
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
