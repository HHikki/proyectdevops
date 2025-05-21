import React from "react";
import { render, screen } from "@testing-library/react";
import Button_A from "../components/Button_A";

test("Renderiza sin errores", () => {
  render(<Button_AButton_A/>);
  //expect(screen.getByRole("heading")).toBeInTheDocument();
});
