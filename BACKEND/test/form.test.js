import "dotenv/config";
import request from "supertest";
import app from "../src/index.js";

let createdFormId = null;
let tokenAdmin = "";
beforeAll(async () => {
  // Login para obtener token de administrador
  const res = await request(app)
    .post("/prisma/login")
    .set("x-api-key", process.env.API_KEY)
    .send({
      email: "admin@mail.com",
      password: "admin123",
    });
  tokenAdmin = res.body.token;
});

describe("📋 Test de endpoints de formulario", () => {
  test("✅ Crear una nueva submission", async () => {
    const res = await request(app)
      .post("/prisma/upform")
      .set("x-api-key", process.env.API_KEY)
      .send({
        nombre: "Juan Pérez",
        dni: "12345678",
        telefono: "987654321",
        correo: "juan@example.com",
        grado: "5to",
        nivel: "Secundaria",
        colegio_procedencia: "IEP San Martín",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.nombre).toBe("Juan Pérez");

    createdFormId = res.body.id;
  });

  test("✅ Obtener todas las submissions", async () => {
    const res = await request(app)
      .get("/prisma/getform")
      .set("x-api-key", process.env.API_KEY)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
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
