import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("Renderiza sin errores", () => {
  render(<App />);
  expect(screen.getByRole("heading")).toBeInTheDocument();
});
