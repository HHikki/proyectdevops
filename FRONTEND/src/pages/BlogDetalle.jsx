import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_KEY, API_BASE_URL } from "../config/env.jsx";
import ReactMarkdown from "react-markdown";
import pict from "../assets/eventos.png";


const MarkdownRenderer = ({ content }) => {
  // Parser básico de markdown
  const parseMarkdown = (text) => {
    if (!text) return "";

    let html = text;

    // Headers
    html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>");

    // Bold and italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Code blocks
    html = html.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      '<pre><code data-lang="$1">$2</code></pre>'
    );

    // Inline code
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Images
    html = html.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      '<img src="$2" alt="$1" />'
    );

    // Blockquotes
    html = html.replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>");

    // Horizontal rules
    html = html.replace(/^---$/gm, "<hr />");

    // Lists - procesar antes de los párrafos
    const lines = html.split("\n");
    const processedLines = [];
    let inUnorderedList = false;
    let inOrderedList = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const isUnorderedListItem = /^[\*\-] (.*)/.test(line);
      const isOrderedListItem = /^\d+\. (.*)/.test(line);

      if (isUnorderedListItem) {
        if (!inUnorderedList) {
          processedLines.push("<ul>");
          inUnorderedList = true;
        }
        if (inOrderedList) {
          processedLines.push("</ol>");
          inOrderedList = false;
        }
        const content = line.replace(/^[\*\-] (.*)/, "$1");
        processedLines.push(`<li>${content}</li>`);
      } else if (isOrderedListItem) {
        if (!inOrderedList) {
          processedLines.push("<ol>");
          inOrderedList = true;
        }
        if (inUnorderedList) {
          processedLines.push("</ul>");
          inUnorderedList = false;
        }
        const content = line.replace(/^\d+\. (.*)/, "$1");
        processedLines.push(`<li>${content}</li>`);
      } else {
        if (inUnorderedList) {
          processedLines.push("</ul>");
          inUnorderedList = false;
        }
        if (inOrderedList) {
          processedLines.push("</ol>");
          inOrderedList = false;
        }
        processedLines.push(line);
      }
    }

    // Cerrar listas abiertas
    if (inUnorderedList) processedLines.push("</ul>");
    if (inOrderedList) processedLines.push("</ol>");

    html = processedLines.join("\n");

    // Paragraphs
    html = html.replace(/\n\n/g, "</p><p>");
    html = "<p>" + html + "</p>";

    // Clean up empty paragraphs and fix elements
    html = html.replace(/<p><\/p>/g, "");
    html = html.replace(/<p>(<h[1-6]>)/g, "$1");
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, "$1");
    html = html.replace(/<p>(<ul>)/g, "$1");
    html = html.replace(/(<\/ul>)<\/p>/g, "$1");
    html = html.replace(/<p>(<ol>)/g, "$1");
    html = html.replace(/(<\/ol>)<\/p>/g, "$1");
    html = html.replace(/<p>(<li>)/g, "$1");
    html = html.replace(/(<\/li>)<\/p>/g, "$1");
    html = html.replace(/<p>(<blockquote>)/g, "$1");
    html = html.replace(/(<\/blockquote>)<\/p>/g, "$1");
    html = html.replace(/<p>(<pre>)/g, "$1");
    html = html.replace(/(<\/pre>)<\/p>/g, "$1");
    html = html.replace(/<p>(<hr \/>)/g, "$1");

    return html;
  };

  const createMarkup = (content) => {
    return { __html: parseMarkdown(content) };
  };

  const customStyles = `
    .markdown-content h1 {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
      color: #111827;
      border-bottom: 2px solid #3B82F6;
      padding-bottom: 0.75rem;
    }
    
    .markdown-content h2 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1.25rem;
      color: #1F2937;
      border-left: 4px solid #60A5FA;
      padding-left: 1rem;
    }
    
    .markdown-content h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #1F2937;
    }
    
    .markdown-content p {
      margin-bottom: 1rem;
      line-height: 1.75;
      color: #374151;
      font-size: 1.125rem;
    }
    
    .markdown-content ul, .markdown-content ol {
      margin-bottom: 1.5rem;
      padding-left: 1.5rem;
    }
    
    .markdown-content li {
      margin-bottom: 0.5rem;
      color: #374151;
      font-size: 1.125rem;
      line-height: 1.75;
    }
    
    .markdown-content ul li {
      list-style-type: disc;
    }
    
    .markdown-content ol li {
      list-style-type: decimal;
    }
    
    .markdown-content blockquote {
      border-left: 4px solid #3B82F6;
      background-color: #EFF6FF;
      padding: 1rem 1.5rem;
      margin: 1.5rem 0;
      font-style: italic;
      color: #1F2937;
      border-radius: 0 0.5rem 0.5rem 0;
    }
    
    .markdown-content code {
      background-color: #F3F4F6;
      color: #DC2626;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
    }
    
    .markdown-content pre {
      background-color: #1F2937;
      color: #F9FAFB;
      padding: 1.5rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      margin: 1.5rem 0;
      position: relative;
    }
    
    .markdown-content pre code {
      background-color: transparent;
      color: inherit;
      padding: 0;
      font-size: 0.875rem;
      line-height: 1.5;
    }
    
    .markdown-content a {
      color: #2563EB;
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 2px;
      transition: all 0.2s ease;
    }
    
    .markdown-content a:hover {
      color: #1D4ED8;
      text-decoration-color: #1D4ED8;
    }
    
    .markdown-content img {
      max-width: 100%;
      height: auto;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      margin: 2rem auto;
      display: block;
    }
    
    .markdown-content hr {
      margin: 2rem 0;
      border: none;
      height: 1px;
      background: linear-gradient(to right, transparent, #9CA3AF, transparent);
    }
    
    .markdown-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      border-radius: 0.5rem;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .markdown-content th {
      background-color: #F3F4F6;
      padding: 0.75rem 1rem;
      text-align: left;
      font-weight: 600;
      color: #1F2937;
      border-bottom: 1px solid #D1D5DB;
    }
    
    .markdown-content td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #D1D5DB;
      color: #374151;
    }
  `;

  return (
    <div className="prose prose-lg max-w-none mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* Header con gradiente */}
      <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      {/* Contenido principal */}
      <div className="p-8 sm:p-12 markdown-content">
        <div dangerouslySetInnerHTML={createMarkup(content)} />
      </div>
    </div>
  );
};

export default function BlogDetalle() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/prisma/post/public/${id}`,
          {
            headers: {
              "x-api-key": API_KEY,
            },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Error al obtener la publicación");
        }

        const data = await response.json();
        setPost(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    } else {
      setError("ID no válido");
      setLoading(false);
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-20 px-4 sm:px-8 lg:px-24 text-[#003049]">
      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003049] mx-auto"></div>
          <p className="mt-4">Cargando publicación...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 transition-all duration-300">
          {" "}
          {/* ✅ Más espacio y redondeo */}
          {/* Imagen del post */}
          <div className="mb-8">
            {/* Mejorar la imagenes, pueden o no poseer mas */}
            <img
              src={post.images?.length > 0 ? post.images[0].image_url : pict}
              alt={post.title}
              className="w-full h-72 object-cover rounded-xl shadow-sm" // ✅ sombra sutil
              loading="lazy"
            />
          </div>
          {/* Título */}
          <h1 className="text-5xl font-extrabold text-center text-[#1a202c] mb-4 leading-tight">
            {post.title}
          </h1>
          {/* Fecha y ubicación */}
          <p className="text-sm text-gray-500 text-center mb-10">
            📅 {formatDate(post.created_at)}
            {post.location && ` | 📍 ${post.location}`}
          </p>
          {/* Contenido Markdown */}
          
            <MarkdownRenderer content={post.content} />
          
          {post.images?.length > 1 ? (
            <>
              <img
                src={post.images[1].image_url}
                alt={post.title}
                className="w-full h-72 object-cover rounded-xl shadow-sm"
                loading="lazy"
              />
              <div className="flex flex-wrap gap-2 mt-4">
                {post.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.image_url}
                    alt={`${post.title} - imagen ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-md shadow"
                    loading="lazy"
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
