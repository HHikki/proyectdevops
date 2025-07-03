<<<<<<< HEAD
// __tests__/Home.test.jsx

=======
/* eslint-env jest */
/* global jest */
>>>>>>> f6552254017d9adc204028c93f1a4e1f70e10aa5
import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";

<<<<<<< HEAD
// Mockeamos todos los componentes hijos
jest.mock("../components/Hero", () => () => (
  <div data-testid="hero-component" />
));
jest.mock("../components/Base", () => () => (
  <div data-testid="educational-pillars-component" />
));
jest.mock("../components/Level", () => () => (
  <div data-testid="level-component" />
));
jest.mock("../components/Footer", () => ({
  Footer: () => <div data-testid="footer-component" />,
}));
jest.mock("../components/Testimonials", () => () => (
  <div data-testid="testimonials-component" />
));
jest.mock("../components/Contact", () => () => (
  <div data-testid="contact-component" />
));

describe("Home Component", () => {
  it("renders all child components inside <main>", () => {
    render(<Home />);

    expect(screen.getByTestId("hero-component")).toBeInTheDocument();
    expect(
      screen.getByTestId("educational-pillars-component")
    ).toBeInTheDocument();
    expect(screen.getByTestId("testimonials-component")).toBeInTheDocument();
    expect(screen.getByTestId("contact-component")).toBeInTheDocument();
    expect(screen.getByTestId("footer-component")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
=======
// Mock de todos los componentes usados en Home
jest.mock("../components/Hero", () => () => <div data-testid="Hero" />);
jest.mock("../components/Base", () => () => <div data-testid="Base" />);
jest.mock("../components/Level", () => () => <div data-testid="Level" />);
jest.mock("../components/Testimonials", () => () => (
  <div data-testid="Testimonials" />
));
jest.mock("../components/Contact", () => () => <div data-testid="Contact" />);
jest.mock("../components/Footer", () => ({
  Footer: () => <div data-testid="Footer" />,
}));

describe("Home Component", () => {
  test("renderiza todos los componentes hijos correctamente", () => {
    render(<Home />);

    expect(screen.getByTestId("Hero")).toBeInTheDocument();
    expect(screen.getByTestId("Base")).toBeInTheDocument();
    expect(screen.getByTestId("Testimonials")).toBeInTheDocument();
    expect(screen.getByTestId("Contact")).toBeInTheDocument();
    expect(screen.getByTestId("Footer")).toBeInTheDocument();
>>>>>>> f6552254017d9adc204028c93f1a4e1f70e10aa5
  });
});
