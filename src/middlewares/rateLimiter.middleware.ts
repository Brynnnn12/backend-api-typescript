import rateLimit from 'express-rate-limit';
import { config } from '../config/env';

export const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: 'Terlalu banyak permintaan dari IP ini, silakan coba lagi nanti.',
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Terlalu banyak upaya otentikasi, silakan coba lagi nanti.',
  skipSuccessfulRequests: true,
});
