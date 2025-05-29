import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import Image1 from "../assets/testimonial1.png";
import Image2 from "../assets/testimonial2.png";
import Image3 from "../assets/testimonial3.png";

const Testimonials = () => {
  const Data = [
    {
      id: 1,
      image: Image1,
      title: "John Doe",
      description:
        "Una experiencia maravillosa. Todo el proceso educativo fue impecable y enriquecedor.",
    },
    {
      id: 2,
      image: Image2,
      title: "Harry Clinton",
      description:
        "Profesional, confiable y dedicado. Cumplieron con todo lo prometido y con gran calidad.",
    },
    {
      id: 3,
      image: Image3,
      title: "Sara C",
      description:
        "Excelente trabajo. La comunicación fue clara y los tiempos se respetaron perfectamente.",
    },
  ];

  return (
    <section className="min-h-screen bg-white py-20">
      <div className="max-w-[1440px] mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold text-[#003049] mb-4">
          Exalumnos prismáticos
        </h2>
        <p className="text-xl text-gray-600 mb-10">Testimonios</p>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={3}
          spaceBetween={30}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 2.5,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination]}
          className="w-full"
        >
          {Data.map(({ id, image, title, description }) => (
            <SwiperSlide key={id}>
              {({ isActive }) => (
                <div
                  className={`transition-all duration-500 ease-in-out
                  ${isActive ? "opacity-100 scale-105" : "opacity-40"}
                  bg-[#003049] text-white rounded-3xl shadow-2xl px-10 py-14
                  max-w-[300px] h-[400px] flex flex-col items-center justify-center text-center mx-auto`}
                >
                  <img
                    src={image}
                    alt={title}
                    className="w-36 h-36 rounded-full object-cover mb-6 border-4 border-white"
                  />
                  <h3 className="text-2xl font-bold mb-3">{title}</h3>
                  <p className="text-base italic px-4">{description}</p>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
