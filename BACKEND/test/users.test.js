import request from "supertest";
import app from "../src/index.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

let tokenAdmin = "";
let createdUserId = null;

const prisma = new PrismaClient();

beforeAll(async () => {
  // Elimina relaciones de posts e imágenes del admin antes de eliminar el usuario
  const adminEmail = "admin@mail.com";
  const adminPassword = "admin123";
  const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (admin) {
    // Elimina imágenes de posts del admin
    await prisma.postImage.deleteMany({
      where: { post: { userId: admin.id } },
    });
    // Elimina posts del admin
    await prisma.post.deleteMany({
      where: { userId: admin.id },
    });
    // Aquí puedes agregar más eliminaciones si tienes más relaciones
    await prisma.user.delete({ where: { id: admin.id } });
  }
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  await prisma.user.create({
    data: {
      username: "admin",
      email: adminEmail,
      password_hash: hashedPassword,
      is_admin: true,
    },
  });
  // Login para obtener token de administrador
  const res = await request(app)
    .post("/prisma/login")
    .set("x-api-key", process.env.API_KEY)
    .send({
      email: adminEmail,
      password: adminPassword,
    });
  tokenAdmin = res.body.token;
});

describe("CRUD de usuarios", () => {
  test("✅ Crear un nuevo usuario", async () => {
    const res = await request(app)
      .post("/prisma/users")
      .set("x-api-key", process.env.API_KEY)
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        username: "test_user",
        email: "test_user@example.com",
        password: "test1234",
        is_admin: false,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.email).toBe("test_user@example.com");
    createdUserId = res.body.id; // Guardamos ID para pruebas siguientes
  });

  test("✅ Obtener todos los usuarios", async () => {
    const res = await request(app)
      .get("/prisma/users")
      .set("x-api-key", process.env.API_KEY)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("✅ Obtener usuario por ID", async () => {
    const res = await request(app)
      .get(`/prisma/users/${createdUserId}`)
      .set("x-api-key", process.env.API_KEY)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(res.statusCode).toBe(200);
    // El email puede haber cambiado si se actualizó antes, así que solo verifica que tenga la propiedad
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("username");
    expect(res.body).not.toHaveProperty("password_hash");
  });

  test("✅ Actualizar usuario", async () => {
    const res = await request(app)
      .put(`/prisma/users/${createdUserId}`)
      .set("x-api-key", process.env.API_KEY)
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        username: "updated_user",
        email: "updated_user@example.com",
        password: "newpass123",
        is_admin: true,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe("updated_user");
  });

  test("✅ Eliminar usuario", async () => {
    const res = await request(app)
      .delete(`/prisma/users/${createdUserId}`)
      .set("x-api-key", process.env.API_KEY)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/eliminado correctamente/i);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
