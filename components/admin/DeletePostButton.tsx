"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

/** Delete button for a post row — calls DELETE /api/posts/[id] and refreshes. */
export default function DeletePostButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Delete this post? This cannot be undone.")) return;

    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="inline-flex items-center gap-1.5 font-sans text-[12px] text-red-500 hover:text-red-700 transition-colors cursor-pointer"
    >
      <Trash2 size={12} /> Delete
    </button>
  );
}
