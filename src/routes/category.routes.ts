import { Router } from 'express';
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  getCategoryBySlugController,
  updateCategoryController,
  deleteCategoryController,
} from '../controllers/category.controller';
import { validate } from '../middlewares/validation.middleware';
import {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
} from '../validations/category.validation';
import { authLimiter } from '../middlewares/rateLimiter.middleware';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/', getAllCategoriesController);
router.get('/:id', validate(categoryIdSchema), getCategoryByIdController);
router.get('/slug/:slug', getCategoryBySlugController);

// Protected routes (Admin only)
router.post(
  '/',
  protect,
  authLimiter,
  validate(createCategorySchema),
  createCategoryController
);

router.put(
  '/:id',
  protect,
  authLimiter,
  validate(updateCategorySchema),
  updateCategoryController
);

router.delete(
  '/:id',
  protect,
  authLimiter,
  validate(categoryIdSchema),
  deleteCategoryController
);

export default router;
