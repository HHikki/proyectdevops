import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Obtener todos los posts
 */
export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        postType: true,
        user: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};

/**
 * Obtener un post por ID
 */
export const getPostById = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user; // Se obtiene el userId del usuario autenticado

  try {
    // Buscar el post por ID y verificar que pertenezca al usuario autenticado
    const post = await prisma.post.findFirst({
      where: {
        id: Number(id),
        userId: Number(userId), // Asegurarse de que el post pertenece al usuario autenticado
      },
      include: {
        postType: true,
        images: true,
      },
    });

    if (!post) {
      return res.status(404).json({
        error:
          "Post no encontrado o no tienes permiso para acceder a este recurso",
      });
    }

    res.json(post);
  } catch (error) {
    console.error("Error al obtener el post:", error);
    res.status(500).json({ error: "Error al obtener el post" });
  }
};

/**
 * Obtener todos los posts de un usuario
 */

export const getMyPosts = async (req, res) => {
  const { userId } = req.user; // Se asume que el middleware de autenticación agrega el userId al objeto req

  try {
    const posts = await prisma.post.findMany({
      where: { userId: Number(userId) },
      include: {
        postType: true,
        images: true, // Incluye las imágenes asociadas a cada post
        user: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });

    if (posts.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron posts para este usuario" });
    }

    res.json(posts);
  } catch (error) {
    console.error("Error al obtener los posts del usuario:", error);
    res.status(500).json({ error: "Error al obtener los posts del usuario" });
  }
};

/**
 * Crear un nuevo post
 */
export const createPost = async (req, res) => {
  const { userId, postTypeId, title, content, start_at, end_at, images } =
    req.body;

  try {
    // Crear el post
    const newPost = await prisma.post.create({
      data: {
        userId,
        postTypeId,
        title,
        content,
        start_at: start_at ? new Date(start_at) : undefined,
        end_at: end_at ? new Date(end_at) : undefined,
      },
    });

    // Crear las imágenes asociadas al post
    if (images && images.length > 0) {
      const postImages = await prisma.postImage.createMany({
        data: images.map((img) => ({
          postId: newPost.id, // Asociar la imagen al post recién creado
          image_url: img.image_url,
          is_cover: img.is_cover || false,
        })),
      });
    }

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error al crear el post:", error);
    res.status(500).json({ error: "Error al crear el post" });
  }
};

/**
 * Actualizar un post existente
 */
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, start_at, end_at, postTypeId } = req.body;
  try {
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        start_at: start_at ? new Date(start_at) : undefined,
        end_at: end_at ? new Date(end_at) : undefined,
        postTypeId,
      },
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el post" });
  }
};

/**
 * Eliminar un post
 */
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.postImage.deleteMany({ where: { postId: Number(id) } }); // Borra imágenes asociadas
    await prisma.post.delete({ where: { id: Number(id) } });
    res.json({ message: "Post eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el post" });
  }
};

/**
 * Obtener posts para la página pública
 */
export const getPublicPosts = async (req, res) => {
  try {
    const { tipo } = req.query; // se espera ?tipo=1 como query string

    const filter = tipo ? { postTypeId: parseInt(tipo) } : {};
    const posts = await prisma.post.findMany({
      where: filter,
      include: {
        postType: true,
        user: {
          select: {
            username: true,
            email: true,
          },
        },
        images: true,
      },
      orderBy: {
        created_at: "desc", // Usar created_at en lugar de createdAt
      },
    });
    // Transforma fechas a strings legibles
    const formattedPosts = posts.map((post) => ({
      ...post,
      created_at: post.created_at.toISOString(), // 👈 convierte a string ISO
    }));
    res.json(formattedPosts);
  } catch (error) {
    console.error("Error al obtener los posts públicos:", error);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};

export const getPublicPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        postType: true,
        images: true,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error al obtener la publicación pública:", error);
    res
      .status(500)
      .json({ error: "Error del servidor al obtener la publicación" });
  }
};
