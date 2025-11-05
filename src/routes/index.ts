import { Router } from 'express';
import authRoutes from './auth.routes';
import categoryRoutes from './category.routes';
import blogRoutes from './blog.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/blogs', blogRoutes);

export default router;
