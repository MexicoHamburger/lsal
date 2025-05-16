import { Link } from "react-router";
import Layout from "@/components/Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useEffect, useState } from "react";

function FeatureBox({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:bg-gray-700 transition text-center">
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

function MainPage() {
  const [autoplayEnabled, setAutoplayEnabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAutoplayEnabled(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 shadow-md flex justify-between items-center">
        <span className="text-white font-bold text-lg">ls -al</span>
        <Link
          to="/login"
          className="ml-auto cursor-pointer hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
          Login
        </Link>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-4 pt-20 pb-12 space-y-10 text-center">
        <div>
          <h1 className="text-5xl font-bold text-white mb-4">ls-al</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            ls -al은 이력, 프로젝트, 포트폴리오를{" "}
            <span className="text-blue-400 font-medium">정리하고 시각화</span>할 수 있는 개인 브랜딩 도구입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <FeatureBox title="🧩 프로젝트 소개" description="썸네일 기반의 카드 UI로 정리" />
          <FeatureBox title="📑 자기소개" description="텍스트 / 이미지 기반 포트폴리오 구성 가능" />
          <FeatureBox title="📌 경력 관리" description="이력을 연도별로 체계적으로 기록" />
        </div>
        <Link
          to="/login"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3 px-8 rounded-lg transition"
        >
          지금 시작하기
        </Link>
      </main>

      {/* Portfolio Gallery */}
      <section className="w-full px-8 mt-16">
        <h2 className="text-2xl font-bold text-white mb-4">다른 사람들의 포트폴리오 확인하기</h2>

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
              <div className="min-w-[300px] aspect-[3/2] bg-gray-700 rounded-2xl p-6 shadow-lg hover:bg-gray-600 transition duration-200 cursor-pointer flex flex-col justify-between">
                <div className="w-full h-4/5 bg-gray-500 rounded-xl mb-4" />
                <div>
                  <h3 className="text-white text-xl font-semibold mb-1">사용자 {idx + 1}</h3>
                  <p className="text-sm text-gray-300 line-clamp-2">
                    포트폴리오 소개 요약입니다. 간단한 설명이나 태그를 표시할 수 있어요.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </Layout>
  );
}

export default MainPage;
