import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  getBlogsByAuthor,
  getBlogsByCategory,
} from '../services/blog.service';
import { ApiResponse } from '../utils/apiResponse';

export const createBlogController = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, content, excerpt, categoryId, published } = req.body;
    const authorId = req.user!.id;

    const blog = await createBlog(
      title,
      content,
      categoryId,
      authorId,
      excerpt,
      published
    );
    ApiResponse.success(res, blog, 'Blog created successfully', 201);
  }
);

export const getAllBlogsController = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit, category, published, author } = req.query;

    const options = {
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
      category: category as string,
      published:
        published === 'true' ? true : published === 'false' ? false : undefined,
      author: author as string,
    };

    const result = await getAllBlogs(options);
    ApiResponse.success(res, result, 'Blogs retrieved successfully');
  }
);

export const getBlogByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const blog = await getBlogById(id);
    ApiResponse.success(res, blog, 'Blog retrieved successfully');
  }
);

export const getBlogBySlugController = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params;
    const blog = await getBlogBySlug(slug);
    ApiResponse.success(res, blog, 'Blog retrieved successfully');
  }
);

export const updateBlogController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content, excerpt, categoryId, published } = req.body;
    const authorId = req.user!.id;

    const blog = await updateBlog(id, authorId, {
      title,
      content,
      excerpt,
      categoryId,
      published,
    });

    ApiResponse.success(res, blog, 'Blog updated successfully');
  }
);

export const deleteBlogController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const authorId = req.user!.id;

    const result = await deleteBlog(id, authorId);
    ApiResponse.success(res, result, 'Blog deleted successfully');
  }
);

export const getBlogsByAuthorController = asyncHandler(
  async (req: Request, res: Response) => {
    const { authorId } = req.params;
    const { page, limit } = req.query;

    const options = {
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    };

    const result = await getBlogsByAuthor(authorId, options);
    ApiResponse.success(res, result, 'Author blogs retrieved successfully');
  }
);

export const getBlogsByCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const { page, limit } = req.query;

    const options = {
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    };

    const result = await getBlogsByCategory(categoryId, options);
    ApiResponse.success(res, result, 'Category blogs retrieved successfully');
  }
);
