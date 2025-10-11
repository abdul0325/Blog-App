"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

export default function CreatePostPage() {
  const router = useRouter();
  const { user, token } = useAuth();
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Please <a href="/login" className="text-[#A33CFC] underline mx-2">login</a> to create a post.
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post(
        "/posts",
        { title: form.title, content: form.content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/"); // Redirect to homepage after creating post
    } catch (err) {
      console.error(err);
      setError("Error creating post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F6EBFE] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg"
      >
        <h1 className="text-2xl font-semibold text-center mb-6 text-[#A33CFC]">
          Create New Post
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full mb-4 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Write your content..."
          className="border p-2 w-full mb-4 rounded min-h-[150px]"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#A33CFC] text-white py-2 w-full rounded hover:bg-[#8c33d9] transition disabled:opacity-60"
        >
          {loading ? "Publishing..." : "Publish Post"}
        </button>

        <p className="text-center text-sm mt-4 text-gray-500">
          <a href="/" className="text-[#A33CFC] hover:underline">← Back to posts</a>
        </p>
      </form>
    </div>
  );
}
