import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
} from '../services/category.service';
import { ApiResponse } from '../utils/apiResponse';

export const createCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const category = await createCategory(name, description);
    ApiResponse.success(res, category, 'Category created successfully', 201);
  }
);

export const getAllCategoriesController = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await getAllCategories();
    ApiResponse.success(res, categories, 'Categories retrieved successfully');
  }
);

export const getCategoryByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await getCategoryById(id);
    ApiResponse.success(res, category, 'Category retrieved successfully');
  }
);

export const getCategoryBySlugController = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params;
    const category = await getCategoryBySlug(slug);
    ApiResponse.success(res, category, 'Category retrieved successfully');
  }
);

export const updateCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await updateCategory(id, name, description);
    ApiResponse.success(res, category, 'Category updated successfully');
  }
);

export const deleteCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteCategory(id);
    ApiResponse.success(res, result, 'Category deleted successfully');
  }
);
