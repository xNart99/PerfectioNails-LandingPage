import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify, estimateReadTime } from "@/lib/utils";

/**
 * GET /api/posts
 * Returns all published posts (public) or all posts when authenticated (admin).
 * Supports ?category=trends&page=1 query params.
 */
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { searchParams } = req.nextUrl;
  const category = searchParams.get("category");
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = parseInt(searchParams.get("limit") ?? "9", 10);

  const where = {
    ...(session ? {} : { published: true }),
    ...(category ? { category: { contains: category, mode: "insensitive" as const } } : {}),
  };

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true, slug: true, title: true, excerpt: true,
        coverImage: true, category: true, readTime: true,
        publishedAt: true, published: true, tags: true,
      },
    }),
    prisma.post.count({ where }),
  ]);

  return NextResponse.json({ posts, total, page, totalPages: Math.ceil(total / limit) });
}

/**
 * POST /api/posts
 * Creates a new post. Requires admin session.
 */
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, excerpt, content, coverImage, category, tags, published, metaTitle, metaDescription } = body;

    if (!title || !excerpt || !content || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const slug = slugify(title);
    const readTime = estimateReadTime(content);

    const post = await prisma.post.create({
      data: {
        slug,
        title,
        excerpt,
        content,
        coverImage,
        category,
        tags: tags ?? [],
        readTime,
        published: published ?? false,
        publishedAt: published ? new Date() : null,
        metaTitle,
        metaDescription,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: unknown) {
    /* Slug collision — title already exists */
    if ((error as { code?: string }).code === "P2002") {
      return NextResponse.json({ error: "A post with this title already exists" }, { status: 409 });
    }
    console.error("[posts POST]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
