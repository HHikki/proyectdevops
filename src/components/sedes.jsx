
import React from "react";

const WelcomeVideo = () => {
  return (
    <div className="bg-[#5d65ae] text-white text-center py-12 px-4 min-h-screen">
      <p className="text-sm text-purple-300">Newsletter</p>
      <h1 className="text-3xl font-bold mt-2">CONOCE NUESTRAS SEDES</h1>
      <h2 className="text-2xl font-semibold mt-1">¡BIENVENIDO!</h2>

      <div className="mt-8 flex justify-center">
        <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/l2m4VOT1Tio"
            title="Video institucional Colegio Prisma"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default WelcomeVideo;
