"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

export default function EditPostPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch existing post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error("Error loading post:", err);
        setMessage("Failed to load post.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPost();
  }, [id]);

  // Handle update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.put(
        `/posts/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Post updated successfully!");
      setTimeout(() => router.push(`/posts/${id}`), 1000);
    } catch (err) {
      console.error("Error updating post:", err);
      setMessage("❌ Failed to update post. Make sure you are the author.");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading post...
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-30 bg-gradient-to-br from-[#F6EBFE] via-[#E7E8EA] to-[#F9F9F9]">
      <div className="backdrop-blur-xl bg-white/60 border border-white/30 shadow-xl rounded-2xl p-8 max-w-2xl w-full transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-extrabold text-[#A33CFC] mb-6 text-center tracking-tight">
          ✏️ Edit Post
        </h1>

        {message && (
          <div className="mb-4 text-center text-sm text-[#FC3EAA] font-medium animate-fade-in">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300/70 rounded-lg p-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#A33CFC] focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full border border-gray-300/70 rounded-lg p-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#A33CFC] focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => router.push(`/posts/${id}`)}
              className="text-gray-600 hover:text-[#A33CFC] transition-colors"
            >
              ← Cancel
            </button>

            <button
              type="submit"
              className="bg-gradient-to-r from-[#A33CFC] to-[#FC3EAA] text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:opacity-90 transition-all"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
