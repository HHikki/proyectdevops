<<<<<<< HEAD
// __tests__/Registro.test.jsx

=======
/* eslint-env jest */
/* global jest */
>>>>>>> f6552254017d9adc204028c93f1a4e1f70e10aa5
import React from "react";
import { render, screen } from "@testing-library/react";
import Registro from "../pages/Registro";

// Mock de componentes hijos
<<<<<<< HEAD
jest.mock("../components/Level", () => () => (
  <div data-testid="level-component" />
));
jest.mock("../components/Propuesta_edu", () => () => (
  <div data-testid="propuesta-edu-component" />
));
jest.mock("../components/SwiperMetodologia", () => () => (
  <div data-testid="swiper-metodologia-component" />
));
jest.mock("../components/Footer", () => ({
  Footer: () => <div data-testid="footer-component" />,
}));

describe("Registro Component", () => {
  it("renders all child components inside a div", () => {
    render(<Registro />);

    expect(screen.getByTestId("level-component")).toBeInTheDocument();
    expect(screen.getByTestId("propuesta-edu-component")).toBeInTheDocument();
    expect(
      screen.getByTestId("swiper-metodologia-component")
    ).toBeInTheDocument();
    expect(screen.getByTestId("footer-component")).toBeInTheDocument();
=======
jest.mock("../components/Level", () => () => <div data-testid="Level" />);
jest.mock("../components/Propuesta_edu", () => () => (
  <div data-testid="PropuestaEdu" />
));
jest.mock("../components/SwiperMetodologia", () => () => (
  <div data-testid="SwiperMetodologia" />
));
jest.mock("../components/Footer", () => ({
  Footer: () => <div data-testid="Footer" />,
}));

describe("Registro Component", () => {
  test("renderiza todos los componentes hijos correctamente", () => {
    render(<Registro />);

    expect(screen.getByTestId("Level")).toBeInTheDocument();
    expect(screen.getByTestId("PropuestaEdu")).toBeInTheDocument();
    expect(screen.getByTestId("SwiperMetodologia")).toBeInTheDocument();
    expect(screen.getByTestId("Footer")).toBeInTheDocument();
>>>>>>> f6552254017d9adc204028c93f1a4e1f70e10aa5
  });
});
