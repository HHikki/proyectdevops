import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, Calendar } from "lucide-react";
import {
  Button,
  Input,
  Label,
  Alert,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Eye,
  EyeOff,
} from "../components/UI";
import logo from "../assets/logo.jpg";

const API_BASE_URL = "http://localhost:4001";


const loginAction = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    // Realiza la solicitud al endpoint /login
    const response = await fetch(`${API_BASE_URL}/prisma/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al iniciar sesión");
    }

    const data = await response.json();
    return { success: true, token: data.token };
  } catch (error) {
    return { error: error.message };
  }
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const result = await loginAction(formData);

    if (result?.success) {
      // Guarda el token en localStorage o en un contexto global
      localStorage.setItem("token", result.token);
      navigate("/PanelA"); // Redirige al panel de control
    } else if (result?.error) {
      setError(result.error);
    }

    setIsLoading(false);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, #003049 0%, #4361ee 50%, #ef233c 100%)",
      }}
    >
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        <div className="hidden lg:block">
          <div className="relative">
            <img
              src={logo}
              alt="Estudiante aprendiendo"
              width={600}
              height={600}
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>INICIAR SESIÓN</CardTitle>
              <p className="text-gray-600 mt-2">Accede a tu panel de control</p>
            </CardHeader>
            <CardContent>
              {error && <Alert>{error}</Alert>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@prisma.edu.pe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 h-12 px-3"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      style={{ background: "transparent" }}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={isLoading}
                >
                  {isLoading ? "INGRESANDO..." : "INGRESAR"}
                </Button>
              </form>

              <div className="text-center text-sm text-gray-600">
                ¿No tienes cuenta?{" "}
                <a
                  href="/register"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Regístrate aquí
                </a>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">
                  Credencial para testear
                </h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <div>
                    <strong>Admin:</strong> admin@prisma.edu.pe / admin123
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">Características</h3>
            <div className="space-y-2 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Gestión de entradas</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Control de fechas</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Panel administrativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

