"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const { user } = useAuth();

  // ✅ Fetch posts
  useEffect(() => {
    api
      .get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  // ✅ Handle delete post
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/posts/${id}`);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete the post. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F6EBFE] via-[#E7E8EA] to-[#F9F9F9] py-30 px-5 md:px-10">
      <div className="max-w-5xl mx-auto">
        {/* ===== Header ===== */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-4xl font-extrabold text-[#132237] tracking-tight drop-shadow-sm">
            📝 Blogs
          </h1>

          {user && (
            <Link
              href="/posts/create"
              className="bg-gradient-to-r from-[#A33CFC] to-[#FC3EAA] text-white px-5 py-2.5 rounded-xl font-medium shadow-md hover:scale-[1.03] hover:shadow-lg transition-all duration-200"
            >
              + New Post
            </Link>
          )}
        </div>

        {/* ===== Posts ===== */}
        {posts.length === 0 ? (
          <p className="text-gray-600 text-center text-lg">No posts yet. Be the first to write one!</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <div
                key={p.id}
                className="backdrop-blur-lg bg-white/70 border border-[#E7E8EA] rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 p-6 flex flex-col justify-between"
              >
                <div>
                  <Link href={`/posts/${p.id}`}>
                    <h2 className="text-2xl font-semibold text-[#132237] hover:text-[#A33CFC] transition-colors duration-200 mb-2">
                      {p.title}
                    </h2>
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                      {p.content}
                    </p>
                  </Link>
                </div>

                <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
                  <p>✍️ {p.author?.name || "Unknown"}</p>

                  {user && (
                    <div className="flex gap-3">
                      <Link
                        href={`/posts/edit/${p.id}`}
                        className="text-[#A33CFC] hover:text-[#9228eb] font-medium transition"
                      >
                        ✏️ Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-[#FC3EAA] hover:text-red-600 font-medium transition"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
