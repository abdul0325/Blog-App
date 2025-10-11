"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    api.get("/posts").then((res) => setPosts(res.data));
  }, []);

  return (
    <main className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6 text-[#A33CFC]">All Blog Posts</h1>
      <div className="space-y-4">
        {posts.map((p) => (
          <div key={p.id} className="border rounded-lg p-4 bg-white shadow">
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="text-gray-600">{p.content}</p>
            <p className="text-sm text-gray-400">by {p.author?.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
