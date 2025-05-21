import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

test("Renderiza sin errores", () => {
  <BrowserRouter>
    render(
    <App />
    );
  </BrowserRouter>;

  //expect(screen.getByRole("heading")).toBeInTheDocument();
});
