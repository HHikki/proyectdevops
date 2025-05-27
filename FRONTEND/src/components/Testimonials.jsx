import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
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
        "A really good job, all aspects of the project were followed step by step and with good results.",
    },
    {
      id: 2,
      image: Image2,
      title: "Harry Clinton",
      description:
        "Professional, reliable, and dedicated. Delivered everything as promised with great quality.",
    },
    {
      id: 3,
      image: Image3,
      title: "Sara C",
      description:
        "Excellent work! Communication was clear and timelines were met with no issues.",
    },
    {
      id: 4,
      image: Image1,
      title: "Sara C",
      description:
        "Excellent work! Communication was clear and timelines were met with no issues.",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Exalumnos prismáticos
        </h2>
        <p className="text-lg text-gray-500 mb-10">Testimonios</p>

        <Swiper
          loop={true}
          grabCursor={true}
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
        >
          {Data.map(({ id, image, title, description }) => (
            <SwiperSlide key={id}>
              <div className="bg-white rounded-2xl shadow-md p-6 mx-4 h-full flex flex-col items-center justify-center transition duration-300 hover:shadow-xl">
                <img
                  src={image}
                  alt={title}
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
