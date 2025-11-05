import { z } from 'zod';

// Blog validations
export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    content: z.string().min(10, 'Content must be at least 10 characters'),
    excerpt: z
      .string()
      .max(300, 'Excerpt must be less than 300 characters')
      .optional(),
    categoryId: z.string().uuid('Invalid category ID'),
    published: z.boolean().optional(),
  }),
});

export const updateBlogSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid blog ID'),
  }),
  body: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').optional(),
    content: z
      .string()
      .min(10, 'Content must be at least 10 characters')
      .optional(),
    excerpt: z
      .string()
      .max(300, 'Excerpt must be less than 300 characters')
      .optional(),
    categoryId: z.string().uuid('Invalid category ID').optional(),
    published: z.boolean().optional(),
  }),
});

export const blogIdSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid blog ID'),
  }),
});

export const blogQuerySchema = z.object({
  query: z.object({
    page: z
      .string()
      .transform((val) => parseInt(val))
      .refine((val) => val > 0, 'Page must be greater than 0')
      .optional(),
    limit: z
      .string()
      .transform((val) => parseInt(val))
      .refine((val) => val > 0 && val <= 100, 'Limit must be between 1 and 100')
      .optional(),
    category: z.string().uuid('Invalid category ID').optional(),
    published: z
      .string()
      .transform((val) => val === 'true')
      .optional(),
    author: z.string().uuid('Invalid author ID').optional(),
  }),
});
