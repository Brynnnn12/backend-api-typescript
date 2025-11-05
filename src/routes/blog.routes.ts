import { Router } from 'express';
import {
  createBlogController,
  getAllBlogsController,
  getBlogByIdController,
  getBlogBySlugController,
  updateBlogController,
  deleteBlogController,
  getBlogsByAuthorController,
  getBlogsByCategoryController,
} from '../controllers/blog.controller';
import { validate } from '../middlewares/validation.middleware';
import {
  createBlogSchema,
  updateBlogSchema,
  blogIdSchema,
  blogQuerySchema,
} from '../validations/blog.validation';
import { authLimiter } from '../middlewares/rateLimiter.middleware';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/', validate(blogQuerySchema), getAllBlogsController);
router.get('/:id', validate(blogIdSchema), getBlogByIdController);
router.get('/slug/:slug', getBlogBySlugController);
router.get(
  '/author/:authorId',
  validate(blogQuerySchema),
  getBlogsByAuthorController
);
router.get(
  '/category/:categoryId',
  validate(blogQuerySchema),
  getBlogsByCategoryController
);

// Protected routes (Authenticated users)
router.post(
  '/',
  protect,
  authLimiter,
  validate(createBlogSchema),
  createBlogController
);

router.put(
  '/:id',
  protect,
  authLimiter,
  validate(updateBlogSchema),
  updateBlogController
);

router.delete(
  '/:id',
  protect,
  authLimiter,
  validate(blogIdSchema),
  deleteBlogController
);

export default router;
