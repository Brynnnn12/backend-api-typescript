import prisma from '../config/database';
import { ApiError } from '../utils/apiError';

export async function createBlog(
  title: string,
  content: string,
  categoryId: string,
  authorId: string,
  excerpt?: string,
  published: boolean = false
) {
  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // Check if slug already exists
  const existingBlog = await prisma.blog.findUnique({ where: { slug } });
  if (existingBlog) {
    throw new ApiError(400, 'Blog with this title already exists');
  }

  // Check if category exists
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  const blog = await prisma.blog.create({
    data: {
      title,
      slug,
      content,
      excerpt,
      categoryId,
      authorId,
      published,
      publishedAt: published ? new Date() : null,
    },
    include: {
      author: {
        select: { id: true, name: true, email: true },
      },
      category: {
        select: { id: true, name: true, slug: true },
      },
    },
  });

  return blog;
}

export async function getAllBlogs(
  options: {
    page?: number;
    limit?: number;
    category?: string;
    published?: boolean;
    author?: string;
  } = {}
) {
  const { page = 1, limit = 10, category, published, author } = options;

  const where: {
    categoryId?: string;
    published?: boolean;
    authorId?: string;
  } = {};
  if (category) where.categoryId = category;
  if (published !== undefined) where.published = published;
  if (author) where.authorId = author;

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.blog.count({ where }),
  ]);

  return {
    blogs,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}

export async function getBlogById(id: string) {
  const blog = await prisma.blog.findUnique({
    where: { id },
    include: {
      author: {
        select: { id: true, name: true, email: true },
      },
      category: {
        select: { id: true, name: true, slug: true },
      },
    },
  });

  if (!blog) {
    throw new ApiError(404, 'Blog not found');
  }

  return blog;
}

export async function getBlogBySlug(slug: string) {
  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: {
      author: {
        select: { id: true, name: true, email: true },
      },
      category: {
        select: { id: true, name: true, slug: true },
      },
    },
  });

  if (!blog) {
    throw new ApiError(404, 'Blog not found');
  }

  return blog;
}

export async function updateBlog(
  id: string,
  authorId: string,
  updates: {
    title?: string;
    content?: string;
    excerpt?: string;
    categoryId?: string;
    published?: boolean;
  }
) {
  // Check if blog exists and user is author
  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog) {
    throw new ApiError(404, 'Blog not found');
  }

  if (blog.authorId !== authorId) {
    throw new ApiError(403, 'Not authorized to update this blog');
  }

  // Generate new slug if title is being updated
  let slug: string | undefined;
  if (updates.title) {
    slug = updates.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Check if new slug conflicts with existing blog (excluding current one)
    const existingBlog = await prisma.blog.findFirst({
      where: {
        slug,
        id: { not: id },
      },
    });

    if (existingBlog) {
      throw new ApiError(400, 'Blog with this title already exists');
    }
  }

  // Check if category exists if being updated
  if (updates.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: updates.categoryId },
    });
    if (!category) {
      throw new ApiError(404, 'Category not found');
    }
  }

  const updateData: {
    title?: string;
    content?: string;
    excerpt?: string;
    categoryId?: string;
    published?: boolean;
    slug?: string;
    publishedAt?: Date | null;
  } = { ...updates };
  if (slug) updateData.slug = slug;

  // Handle published status change
  if (updates.published !== undefined) {
    if (updates.published && !blog.publishedAt) {
      updateData.publishedAt = new Date();
    } else if (!updates.published) {
      updateData.publishedAt = null;
    }
  }

  const updatedBlog = await prisma.blog.update({
    where: { id },
    data: updateData,
    include: {
      author: {
        select: { id: true, name: true, email: true },
      },
      category: {
        select: { id: true, name: true, slug: true },
      },
    },
  });

  return updatedBlog;
}

export async function deleteBlog(id: string, authorId: string) {
  // Check if blog exists and user is author
  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog) {
    throw new ApiError(404, 'Blog not found');
  }

  if (blog.authorId !== authorId) {
    throw new ApiError(403, 'Not authorized to delete this blog');
  }

  await prisma.blog.delete({ where: { id } });

  return { message: 'Blog deleted successfully' };
}

export async function getBlogsByAuthor(
  authorId: string,
  options: { page?: number; limit?: number } = {}
) {
  return getAllBlogs({ ...options, author: authorId });
}

export async function getBlogsByCategory(
  categoryId: string,
  options: { page?: number; limit?: number } = {}
) {
  return getAllBlogs({ ...options, category: categoryId });
}
