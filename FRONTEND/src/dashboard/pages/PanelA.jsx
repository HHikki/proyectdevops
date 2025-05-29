import React from "react";
import { Button } from "../components/UI";

export default function PanelA() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-600 to-red-500">
      <Button className="text-2xl px-8 py-4 shadow-xl">Bienvenido</Button>
    </div>
  );
}