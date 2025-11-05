import prisma from '../config/database';
import { ApiError } from '../utils/apiError';

export async function createCategory(name: string, description?: string) {
  // Generate slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // Check if slug already exists
  const existingCategory = await prisma.category.findUnique({
    where: { slug },
  });
  if (existingCategory) {
    throw new ApiError(400, 'Category with this name already exists');
  }

  const category = await prisma.category.create({
    data: {
      name,
      slug,
      description,
    },
  });

  return category;
}

export async function getAllCategories() {
  return await prisma.category.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getCategoryById(id: string) {
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  return category;
}

export async function getCategoryBySlug(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  return category;
}

export async function updateCategory(
  id: string,
  name?: string,
  description?: string
) {
  // Check if category exists
  await getCategoryById(id);

  // Generate new slug if name is being updated
  let slug: string | undefined;
  if (name) {
    slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Check if new slug conflicts with existing category (excluding current one)
    const existingCategory = await prisma.category.findFirst({
      where: {
        slug,
        id: { not: id },
      },
    });

    if (existingCategory) {
      throw new ApiError(400, 'Category with this name already exists');
    }
  }

  const category = await prisma.category.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(slug && { slug }),
      ...(description !== undefined && { description }),
    },
  });

  return category;
}

export async function deleteCategory(id: string) {
  // Check if category exists
  await getCategoryById(id);

  // Check if category has blogs
  const blogCount = await prisma.blog.count({
    where: { categoryId: id },
  });

  if (blogCount > 0) {
    throw new ApiError(400, 'Cannot delete category with existing blogs');
  }

  await prisma.category.delete({
    where: { id },
  });

  return { message: 'Category deleted successfully' };
}
