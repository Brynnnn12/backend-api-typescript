import { Request, Response, NextFunction } from 'express';
import { validate } from '../../src/middlewares/validation.middleware';
import { z } from 'zod';

describe('Validation Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      body: {},
      query: {},
      params: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  describe('validate middleware', () => {
    it('should call next() when validation passes', async () => {
      const schema = z.object({
        body: z.object({
          email: z.string().email(),
          name: z.string().min(2),
        }),
      });

      mockRequest.body = {
        email: 'test@example.com',
        name: 'John Doe',
      };

      const middleware = validate(schema);
      await middleware(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
    });

    it('should return 400 error when validation fails', async () => {
      const schema = z.object({
        body: z.object({
          email: z.string().email(),
          name: z.string().min(2),
        }),
      });

      mockRequest.body = {
        email: 'invalid-email',
        name: 'A', // Too short
      };

      const middleware = validate(schema);
      await middleware(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Validation error',
          errors: expect.any(Array),
        })
      );
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should validate query parameters', async () => {
      const schema = z.object({
        query: z.object({
          page: z.string().transform(Number),
          limit: z.string().transform(Number).optional(),
        }),
      });

      mockRequest.query = {
        page: '1',
        limit: '10',
      };

      const middleware = validate(schema);
      await middleware(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
    });

    it('should validate params', async () => {
      const schema = z.object({
        params: z.object({
          id: z.string().uuid(),
        }),
      });

      mockRequest.params = {
        id: '123e4567-e89b-12d3-a456-426614174000',
      };

      const middleware = validate(schema);
      await middleware(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
    });
  });
});
