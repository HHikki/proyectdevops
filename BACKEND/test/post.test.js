import "dotenv/config";
import request from "supertest";
import app from "../src/index.js";

let token;
let postId;
let postTypeId = 1; // Ajusta según tu base de datos
let userId = 1; // Ajusta según un usuario válido en tu BD

beforeAll(async () => {
  // Autenticación para obtener el token
  const res = await request(app)
    .post("/prisma/login")
    .set("x-api-key", process.env.API_KEY)
    .send({
      email: "admin@mail.com",
      password: "admin123",
    });

  token = res.body.token;
});

describe("📬 Endpoints de post", () => {
  test("✅ Crear post", async () => {
    const res = await request(app)
      .post("/prisma/post")
      .set("x-api-key", process.env.API_KEY)
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: userId,
        postType: postTypeId,
        title: "Nuevo post de prueba",
        content: "Contenido del post",
        start_at: "2025-07-01",
        end_at: "2025-07-15",
        images: [
          {
            image_url: "https://example.com/imagen1.jpg",
            is_cover: true,
          },
        ],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    postId = res.body.id;
  });

  test("✅ Obtener todos los posts", async () => {
    const res = await request(app)
      .get("/prisma/post")
      .set("x-api-key", process.env.API_KEY)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("✅ Obtener post por ID", async () => {
    const res = await request(app)
      .get(`/prisma/post/e/${postId}`)
      .set("x-api-key", process.env.API_KEY)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("title");
  });

  test("✅ Actualizar post", async () => {
    const res = await request(app)
      .put(`/prisma/post/${postId}`)
      .set("x-api-key", process.env.API_KEY)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Post actualizado",
        content: "Contenido actualizado",
        images: [
          {
            image_url: "https://example.com/imagen2.jpg",
            is_cover: true,
          },
        ],
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Post actualizado");
  });

  test("✅ Eliminar post", async () => {
    const res = await request(app)
      .delete(`/prisma/post/${postId}`)
      .set("x-api-key", process.env.API_KEY)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/eliminado correctamente/i);
  });

  test("✅ Obtener posts públicos", async () => {
    const res = await request(app)
      .get("/prisma/post/page")
      .set("x-api-key", process.env.API_KEY);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
