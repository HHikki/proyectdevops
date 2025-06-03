import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

// Mocks de Swiper y sus estilos para evitar errores de Jest
jest.mock("swiper/react", () => ({
  Swiper: ({ children }) => <div>{children}</div>,
  SwiperSlide: ({ children }) => <div>{children}</div>,
}));
jest.mock("swiper/css", () => {});
jest.mock("swiper/css/pagination", () => {});
jest.mock("../config/env.jsx", () => ({
  API_BASE_URL: "http://localhost:4001",
  API_KEY: "test_api_key",
}));

test("Renderiza sin errores", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Aquí puedes validar algún texto o componente que esperes
  // Por ejemplo, si tu App tiene un título visible:
  // expect(screen.getByText("Bienvenido")).toBeInTheDocument();
});
