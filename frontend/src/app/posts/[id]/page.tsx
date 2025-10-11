"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
}

export default function PostDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load post.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg animate-pulse">
        Loading post...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <p className="text-lg">{error || "Post not found."}</p>
        <button
          onClick={() => router.push("/")}
          className="text-[#A33CFC] underline mt-3 hover:text-[#FC3EAA] transition"
        >
          ← Back to posts
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F6EBFE] via-[#F9F9F9] to-white px-4 py-30 flex justify-center">
      <div className="bg-white/80 backdrop-blur-xl border border-[#E7E8EA]/50 shadow-2xl rounded-3xl max-w-3xl w-full p-8 md:p-10 transition-transform hover:scale-[1.01] duration-300">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#A33CFC] to-[#FC3EAA] bg-clip-text text-transparent mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Author & Date */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 mb-8">
          <p>
            ✍️ By <span className="font-medium text-[#132237]">{post.author?.name}</span>
          </p>
          <p className="mt-1 sm:mt-0">
            📅 {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <article className="text-gray-800 leading-relaxed text-[1.05rem] whitespace-pre-line tracking-wide">
          {post.content}
        </article>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#A33CFC]/30 to-transparent my-8" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
          <button
            onClick={() => router.push("/")}
            className="px-5 py-2 rounded-xl text-[#A33CFC] border border-[#A33CFC]/40 hover:bg-[#A33CFC]/10 font-medium transition"
          >
            ← Back to All Posts
          </button>

          {user && (
            <button
              onClick={() => router.push(`/posts/edit/${post.id}`)}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FC3EAA] to-[#A33CFC] text-white font-medium hover:scale-105 transition-transform shadow-md"
            >
              ✏️ Edit This Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
