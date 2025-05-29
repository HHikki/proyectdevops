import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Obtener todos los posts
 */
export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        postType: true,
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
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
        postType: true,
        PostImage: true,
      },
    });
    if (!post) return res.status(404).json({ error: "Post no encontrado" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el post" });
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


