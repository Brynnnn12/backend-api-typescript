import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  register as registerService,
  login as loginService,
} from '../services/auth.service';
import { ApiResponse } from '../utils/apiResponse';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const result = await registerService(email, password, name);
  ApiResponse.success(res, result, 'User registered successfully', 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await loginService(email, password);
  ApiResponse.success(res, result, 'Login successful');
});
