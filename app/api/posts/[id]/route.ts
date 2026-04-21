import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { estimateReadTime } from "@/lib/utils";

/**
 * GET /api/posts/[id]
 * Returns a single post by ID or slug.
 * Published-only for unauthenticated; any for admin.
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  const post = await prisma.post.findFirst({
    where: {
      OR: [{ id: params.id }, { slug: params.id }],
      ...(session ? {} : { published: true }),
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

/**
 * PUT /api/posts/[id]
 * Updates a post. Requires admin session.
 */
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, excerpt, content, coverImage, category, tags, published, metaTitle, metaDescription } = body;

    const existing = await prisma.post.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const readTime = content ? estimateReadTime(content) : existing.readTime;

    const post = await prisma.post.update({
      where: { id: params.id },
      data: {
        title,
        excerpt,
        content,
        coverImage,
        category,
        tags: tags ?? existing.tags,
        readTime,
        published: published ?? existing.published,
        publishedAt: published && !existing.publishedAt ? new Date() : existing.publishedAt,
        metaTitle,
        metaDescription,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("[posts PUT]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/**
 * DELETE /api/posts/[id]
 * Deletes a post. Requires admin session.
 */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.post.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
