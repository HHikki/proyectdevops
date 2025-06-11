import React from "react";
import { Card } from "./Card";

export const Carrusel = () => {
    
  const cor = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ];
  return (
    <div>
      <div className="animate-scroll">
        <div className="overflow-hidden w-full">
          <div className="flex whitespace-nowrap animate-scroll">
            {cor.map((e) => (
              <Card carro={e.id} key={e.id}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
