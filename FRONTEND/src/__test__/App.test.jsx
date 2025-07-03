/* eslint-env jest */
/* global jest */

import { render } from "@testing-library/react";
import { test } from '@jest/globals';
import App from "../App";
import { BrowserRouter } from "react-router-dom";

// Mocks de Swiper y sus estilos para evitar errores de Jest
jest.mock("swiper/react", () => ({
  // Mock components that render a div wrapper
  Swiper: ({ children }) => <div data-testid="swiper-mock">{children}</div>,
  SwiperSlide: ({ children }) => <div data-testid="swiper-slide-mock">{children}</div>
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
});
