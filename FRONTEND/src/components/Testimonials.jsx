import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import Image1 from "../assets/testimonio1.png";
import Image2 from "../assets/testimonio2.png";
import Image3 from "../assets/testimonio3.png";
import Image4 from "../assets/testimonio4.png";
import Image5 from "../assets/testimonio5.png";

const Testimonials = () => {
  const Data = [
    {
      id: 1,
      image: Image1,
      title: "John Perez",
      description:
        "Estuve, estoy y estaré muy agradecida con la Familia Prisma,  y los increíbles integrantes de ella ¡Estudio, Disciplina, Superación, Fuerza Prisma! ",
    },
    {
      id: 2,
      image: Image2,
      title: "Aisha Pastor",
      description:
        "Tengo la felicidad de decir que fue en Prisma en donde encontré los sueños que quería; y gracias a esto logré mi ingreso a la Universidad",
    },
    {
      id: 3,
      image: Image3,
      title: "Alisson Torres",
      description:
        "Tengo los recuerdos de un colegio lleno de risas niños en las horas de descanso, y de un aula con el profesor dictando las clases más dinámicas.",
    },
    {
      id: 4,
      image: Image4,
      title: "Cristiano Cueva",
      description:
        "Tuve la increíble oportunidad de haber estado en este bonito hogar, con la mejor familia que hay; tuve la oportunidad de encontrar quien era yo realmente",
    },
    {
      id: 5,
      image: Image5,
      title: "Samira Quispe",
      description:
        "Aún recuerdo la primera vez que entré al colegio, fue un día realmente especial, fue el comienzo de nuevas aventuras que día a día fueron marcando en mi corazón. ",
    },
  ];

  return (
    <section className="bg-gray-50  pt-12 pb-14">
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
                  bg-[#780000] text-white rounded-3xl shadow-2xl px-10 py-10
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
