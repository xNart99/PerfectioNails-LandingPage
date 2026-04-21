import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import PostForm from "@/components/admin/PostForm";

/** Admin — create a new post. */
export default async function NewPostPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return <PostForm />;
}
