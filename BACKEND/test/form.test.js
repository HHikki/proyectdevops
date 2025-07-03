import "dotenv/config";
import request from "supertest";
import app from "../src/index.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let tokenAdmin = "";
let createdFormId = null;

beforeAll(async () => {
  // 🔑 Login para obtener token de administrador
  const res = await request(app)
    .post("/prisma/login")
    .set("x-api-key", process.env.API_KEY)
    .send({
      email: "admin@mail.com",
      password: "admin123",
    });

  if (res.statusCode !== 200 || !res.body.token) {
    console.error("❌ No se obtuvo un token válido en form.test.js");
    throw new Error("Login fallido: tokenAdmin no definido");
  }

  tokenAdmin = res.body.token;

  // 🧹 Elimina duplicados anteriores por si corren múltiples veces
  await prisma.formSubmission.deleteMany({
    where: { correo: "juan@example.com" },
  });

  // 📝 Crear registro de prueba
  const submission = await prisma.formSubmission.create({
    data: {
      nombre: "Juan Pérez",
      dni: "12345678",
      telefono: "987654321",
      correo: "juan@example.com",
      grado: "5to",
      nivel: "Secundaria",
      colegio_procedencia: "IEP San Martín",
    },
  });

  createdFormId = submission.id;
});

describe("📋 Test de endpoints de formulario", () => {
  test("✅ Obtener todas las submissions", async () => {
    const res = await request(app)
      .get("/prisma/getform")
      .set("x-api-key", process.env.API_KEY)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    const found = res.body.find((item) => item.id === createdFormId);
    expect(found).toBeDefined();
    expect(found.nombre).toBe("Juan Pérez");
  });

  test("✅ Eliminar una submission por ID", async () => {
    const res = await request(app)
      .delete(`/prisma/delfrom/${createdFormId}`)
      .set("x-api-key", process.env.API_KEY)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/eliminada correctamente/i);
    expect(res.body.deletedSubmission).toHaveProperty("id", createdFormId);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
