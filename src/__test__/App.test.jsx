import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Componente principal App", () => {
  test("Renderiza sin errores", () => {
    render(<App />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});
