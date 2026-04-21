import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import PostForm from "@/components/admin/PostForm";

interface EditPostPageProps {
  params: { id: string };
}

/** Admin — edit an existing post. */
export default async function EditPostPage({ params }: EditPostPageProps) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  return (
    <PostForm
      initialData={{
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage ?? "",
        category: post.category,
        tags: post.tags,
        published: post.published,
        metaTitle: post.metaTitle ?? "",
        metaDescription: post.metaDescription ?? "",
      }}
    />
  );
}
