import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { API_KEY, API_BASE_URL } from "../config/env.jsx";
import img4 from "../assets/blog_post1.jpg";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Blog_post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/prisma/post/page?tipo=2`,
          {
            headers: { "x-api-key": API_KEY },
            cache: "no-cache",
          }
        );
        if (!response.ok)
          throw new Error("Error al obtener los posts del blog");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return (
    <section className="px-6 py-10 bg-[#f0e4d0]">
      <h2
        className="text-5xl md:text-6xl font-black text-center mb-8 text-[#003049]"
        data-aos="fade-up"
      >
        Publicaciones
      </h2>
      <p
        className="text-lg md:text-xl text-[#3B4D61] text-center max-w-2xl mx-auto mb-8"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Aquí compartimos reflexiones, novedades y recomendaciones para
        acompañarte en el crecimiento y formación de tus hijos dentro y fuera
        del aula.
      </p>

      {loading ? (
        <div className="text-center text-gray-600">
          Cargando publicaciones...
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <div
            className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-25"
            data-aos="fade-up"
          >
            {paginatedPosts.map((post, idx) => (
              <div
                key={post.id}
                className="border-2x1 shadow-lg rounded overflow-hidden bg-[#780000] hover:bg-[#003049] transition duration-300"
                data-aos="zoom-in-up"
                data-aos-delay={idx * 100}
              >
                <div className="relative">
                  <img
                    src={
                      post.images?.length > 0 ? post.images[0].image_url : img4
                    }
                    alt={post.title}
                    className="w-65 my-5 h-65 object-cover mx-auto rounded"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-white mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-white">
                    {formatDate(post.created_at)}
                  </p>
                  <Link
                    to={`/Blog/${post.id}`}
                    className="flex items-center gap-1 text-blue-300 hover:underline ml-45"
                  >
                    Leer más
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={posts.length}
              onChange={setCurrentPage}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default Blog_post;
