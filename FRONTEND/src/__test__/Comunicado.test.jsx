import { jest, describe, test, expect, beforeEach, afterEach } from '@jest/globals';
// Mock de variables de entorno de Vite para Jest
jest.mock("../config/env.jsx", () => ({
  API_KEY: "dummy-key",
  API_BASE_URL: "http://localhost:3000/api",
}));

import { render, screen, waitFor } from "@testing-library/react";
import Comunicado from "../pages/Comunicado";
import React from "react";
import { MemoryRouter } from "react-router-dom";

// Usar Jest para los hooks globales
describe("Comunicado Page", () => {
  beforeEach(() => {
    window.fetch = jest.fn();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders loading state initially", () => {
    render(
      <MemoryRouter>
        <Comunicado />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("renders posts after loading", async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, title: "Test Comunicado" }],
    });
    render(
      <MemoryRouter>
        <Comunicado />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Test Comunicado/i)).toBeInTheDocument();
    });
  });

  test("handles error state", async () => {
    window.fetch.mockRejectedValueOnce(new Error("API error"));
    render(
      <MemoryRouter>
        <Comunicado />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});